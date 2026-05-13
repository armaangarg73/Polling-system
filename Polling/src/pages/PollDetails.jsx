import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getSinglePoll, submitResponse } from "../services/pollService";

const PollDetails = () => {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getSinglePoll(id);
        setPoll(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPoll();
  }, [id]);

  if (!poll) {
    return <p>Loading...</p>;
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
      const response = await submitResponse({
        pollId: poll._id,
        answers,
      });

      console.log(response.data);

      setMessage("Response submitted successfully");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      {poll.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={answers[index]?.selectedOption === option}
                  onChange={() => handleSelectOption(index, option)}
                />

                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmitResponse}>Submit Response</button>
    </div>
  );
};

export default PollDetails;
