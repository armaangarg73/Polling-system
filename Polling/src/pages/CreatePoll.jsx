import { useState } from "react";
import { createPoll } from "../services/pollService.js";

const CreatePoll = () => {
  const [pollData, setPollData] = useState({
    title: "",
    description: "",
    allowAnonymous: true,

    questions: [
      {
        question: "",
        options: ["", ""],
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
      const response = await createPoll(pollData);

      console.log(response.data);

      setMessage("Poll Created Successfully");
    } catch (error) {
      console.log(error);

     setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Create Poll</h1>

      {message && <p>{message}</p>}

      <input
        type="text"
        placeholder="Poll title"
        name="title"
        value={pollData.title}
        onChange={handlePollChange}
      />

      <textarea
        placeholder="Description"
        name="description"
        value={pollData.description}
        onChange={handlePollChange}
      />

      <label>
        Anonymous Responses
        <input
          type="checkbox"
          name="allowAnonymous"
          checked={pollData.allowAnonymous}
          onChange={handlePollChange}
        />
      </label>

      {pollData.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h3>Question {questionIndex + 1}</h3>

          <input
            type="text"
            placeholder="Question"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
              />
            </div>
          ))}

          <button onClick={() => addOption(questionIndex)}>Add Option</button>
        </div>
      ))}

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Create Poll</button>
    </div>
  );
};

export default CreatePoll;
