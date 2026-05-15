import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { getSinglePoll, submitResponse } from "../services/pollService";

const socket = io("http://localhost:5000");

const PollDetails = () => {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [message, setMessage] = useState("");

  const isExpired = poll?.expiresAt && new Date() > new Date(poll.expiresAt);

  const [score, setScore] = useState(null);

  const [participants, setParticipants] = useState(null);

  const [showQR, setShowQR] = useState(false);

  const pollUrl = `${window.location.origin}/poll/${id}`;

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getSinglePoll(id);
        setPoll(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch poll");
      }
    };
    fetchPoll();
  }, [id]);

  useEffect(() => {
    socket.emit("joinPoll", id);

    socket.on("participantCount", (count) => {
      setParticipants(count);
    });

    return () => {
      socket.emit("leavePoll", id);

       socket.off("participantCount", (count) => {
        setParticipants(count);
      });
    };
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pollUrl);
    setMessage("Poll link copied!");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!poll) {
    return (
      <div
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >
        <h1 className="text-5xl font-black">Loading Analytics...</h1>
      </div>
    );
  }

  const handleSelectOption = (questionIndex, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      questionIndex,
      selectedOption,
    };
    setAnswers(updatedAnswers);
  };

  const handleSubmitResponse = async () => {
    const requiredQuestions = poll.questions.filter(
      (question) => question.required,
    );

    const answeredRequiredQuestions = requiredQuestions.filter(
      (_, index) => answers[index],
    );

    if (answeredRequiredQuestions.length !== requiredQuestions.length) {
      setMessage("Please answer all required questions");

      return;
    }
    try {
      await submitResponse({
        pollId: poll._id,
        answers,
      });

      let totalCorrect = 0;

      poll.questions.forEach((question, index) => {
        if (answers[index]?.selectedOption === question.correctAnswer) {
          totalCorrect++;
        }
      });

      setScore(totalCorrect);

      setMessage("Response submitted successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      p-8
      relative
      overflow-hidden
    "
    >
      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-cyan-600/20
        rounded-full
        blur-3xl
        top-[-100px]
        left-[-100px]
      "
      />

      <div
        className="
        absolute
        w-[400px]
        h-[400px]
        bg-purple-600/20
        rounded-full
        blur-3xl
        bottom-[-100px]
        right-[-100px]
      "
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {message && (
          <div
            className="
            mb-6
            p-4
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            text-cyan-400
          "
          >
            {message}
          </div>
        )}
        <div
          className="
          p-8
          rounded-3xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          mb-8
        "
        >
          {isExpired && (
            <div
              className="
              mb-8
              p-5
              rounded-3xl
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              font-semibold
              text-lg
            "
            >
              This poll has expired. Responses are closed
            </div>
          )}
          <h1
            className="
            text-5xl
            font-black
            bg-gradient-to-r
            from-cyan-400
            via-blue-400
            to-purple-400
            text-transparent
            bg-clip-text
            mb-4
          "
          >
            {poll.title}
          </h1>
          <p className="text-gray-400 text-lg">{poll.description}</p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div
              className="
                  mt-4
                  inline-block
                  px-4
                  py-2
                  rounded-2xl
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  text-cyan-400
                  "
            >
              {participants !== null ? `${participants} viewing` : "Loading..."}
            </div>
            <button
              onClick={() => setShowQR(!showQR)}
              className="
                px-4
                py-2
                rounded-2xl
                bg-purple-500/10
                border
                border-purple-500/20
                text-purple-400
                hover:bg-purple-500/20
                transition-all
                duration-300
                font-semibold
                mt-4
              "
            >
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </button>
            <button
              onClick={handleCopyLink}
              className="
                px-4
                py-2
                rounded-2xl
                bg-blue-500/10
                border
                border-blue-500/20
                text-blue-400
                hover:bg-blue-500/20
                transition-all
                duration-300
                font-semibold
                mt-4
              "
            >
              Copy Link
            </button>
          </div>

          {showQR && (
            <div
              className="
                mt-6
                p-6
                rounded-2xl
                bg-white
                inline-block
              "
            >
              <QRCodeSVG
                value={pollUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
              <p className="text-black text-center mt-2 text-sm font-semibold">
                Scan to join poll
              </p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {poll.questions.map((question, index) => (
            <div
              key={index}
              className="
                p-8
                rounded-3xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                  mb-6
                "
              >
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`
                      flex
                      items-center
                      p-5
                      rounded-2xl
                      border
                      cursor-pointer
                      transition-all
                      duration-300
                      ${
                        answers[index]?.selectedOption === option
                          ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                          : "border-white/10 bg-white/5 hover:border-purple-500 hover:bg-purple-500/10"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={answers[index]?.selectedOption === option}
                      onChange={() => handleSelectOption(index, option)}
                      className="hidden"
                    />

                    <span className="text-lg">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {score !== null && (
          <div
            className="
      mt-8
      p-6
      rounded-3xl
      bg-green-500/10
      border
      border-green-500/20
      text-center
    "
          >
            <h2
              className="
        text-4xl
        font-black
        text-green-400
      "
            >
              Score:
              {score} /{poll.questions.length}
            </h2>
          </div>
        )}
        <button
          onClick={handleSubmitResponse}
          disabled={isExpired}
          className={`
    mt-10
    w-full
    py-5
    rounded-3xl
    font-bold
    text-xl
    transition-all
    duration-300

    ${
      isExpired
        ? `
          bg-red-500/10
          border
          border-red-500/20
          text-red-400
          cursor-not-allowed
        `
        : `
          bg-gradient-to-r
          from-cyan-500
          to-purple-600
          hover:scale-[1.02]
          hover:shadow-2xl
        `
    }
  `}
        >
          {isExpired ? "Poll expired" : "Submit Response"}
        </button>
      </div>
    </div>
  );
};

export default PollDetails;
