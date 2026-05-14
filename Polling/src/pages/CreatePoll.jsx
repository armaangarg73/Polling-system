import { useState } from "react";
import { createPoll } from "../services/pollService.js";

const CreatePoll = () => {
  const [pollData, setPollData] = useState({
    title: "",
    description: "",
    expiresAt: "",
    allowAnonymous: true,

    questions: [
      {
        question: "",
        options: ["", ""],
        correctAnswer: "",
        required: false,
      },
    ],
  });

  const handlePollChange = (e) => {
    setPollData({
      ...pollData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...pollData.questions];

    updatedQuestions[index].question = value;

    setPollData({
      ...pollData,
      questions: updatedQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...pollData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setPollData({
      ...pollData,
      questions: updatedQuestions,
    });
  };
  const addQuestion = () => {
    setPollData({
      ...pollData,

      questions: [
        ...pollData.questions,

        {
          question: "",
          options: ["", ""],
          correctAnswer: "",
          required: false,
        },
      ],
    });
  };
  const addOption = (questionIndex) => {
    const updatedQuestions = [...pollData.questions];
    updatedQuestions[questionIndex].options.push("");
    setPollData({
      ...pollData,
      questions: updatedQuestions,
    });
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await createPoll(pollData);

      setMessage("Poll Created Successfully");
    } catch (error) {

      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleCorrectAnsChange = (questionIndex, value) => {
    const updatedQuestions = [...pollData.questions];

    updatedQuestions[questionIndex].correctAnswer = value;

    setPollData({
      ...pollData,
      questions: updatedQuestions,
    });
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
        bg-blue-600/20
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

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1
            className="
            text-6xl
            font-black
            bg-gradient-to-r
            from-blue-400
            via-purple-400
            to-cyan-400
            text-transparent
            bg-clip-text
          "
          >
            Create Poll
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Design interactive futuristic polls.
          </p>
        </div>

        {message && (
          <div
            className="
            mb-6
            p-4
            rounded-2xl
            bg-green-500/10
            border
            border-green-500/20
            text-green-400
          "
          >
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Poll title"
          name="title"
          value={pollData.title}
          onChange={handlePollChange}
          className="
            w-full
            p-5
            rounded-2xl
            bg-white/5
            border
            border-white/10
            outline-none
            focus:border-blue-500
            text-lg
            mb-6
          "
        />

        <textarea
          placeholder="Description"
          name="description"
          value={pollData.description}
          onChange={handlePollChange}
          className="
            w-full
            p-5
            rounded-2xl
            bg-white/5
            border
            border-white/10
            outline-none
            focus:border-purple-500
            h-32
            resize-none
            mb-4
          "
        />

        <input
          type="datetime-local"
          name="expiresAt"
          value={pollData.expiresAt}
          onChange={handlePollChange}
          className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-white/10
    outline-none
    focus:border-cyan-500
    mb-6
  "
        />

        <label
          className="
          flex
          items-center
          gap-3
          mb-10
          text-lg
          text-gray-300
        "
        >
          <input
            type="checkbox"
            name="allowAnonymous"
            checked={pollData.allowAnonymous}
            onChange={handlePollChange}
            className="
            w-5
            h-5
            accent-purple-500
          "
          />
          Allow Anonymous Responses
        </label>

        {pollData.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="
              mb-8
              p-6
              rounded-3xl
              bg-white/5
              border
              border-white/10
              backdrop-blur-xl
            "
          >
            <h2 className="text-3xl font-bold mb-6">
              Question {questionIndex + 1}
            </h2>

            <input
              type="text"
              placeholder="Question"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
                outline-none
                focus:border-cyan-500
                mb-6
              "
            />
            <div className="space-y-4">
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      questionIndex,
                      optionIndex,
                      e.target.value,
                    )
                  }
                  className="
                      w-full
                      p-4
                      rounded-2xl
                      bg-black/30
                      border
                      border-white/10
                      outline-none
                      focus:border-purple-500
                    "
                />
              ))}
            </div>

            <button
              onClick={() => addOption(questionIndex)}
              className="
                mt-6
                px-6
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                hover:scale-105
                transition-all
                duration-300
                font-semibold
              "
            >
              Add Option
            </button>
            <select
              value={question.correctAnswer}
              onChange={(e) =>
                handleCorrectAnsChange(questionIndex, e.target.value)
              }
              className="
                      mt-6
                      w-full
                      p-4
                      rounded-2xl
                      bg-black/30
                      border
                      border-white/10
                      outline-none
                        "
            >
              <option value="">Select Correct Answer</option>

              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex gap-5 mt-10">
          <button
            onClick={addQuestion}
            className="
            px-8
            py-4
            rounded-2xl
            bg-white/10
            border
            border-white/10
            hover:bg-white/20
            transition
            font-semibold
          "
          >
            Add Question
          </button>
          <button
            onClick={handleSubmit}
            className="
            px-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            hover:scale-105
            transition-all
            duration-300
            font-bold
          "
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
