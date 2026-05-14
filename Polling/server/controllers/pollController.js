import Poll from "../models/Poll.js";
import Response from "../models/Response.js";

export const createPoll = async (req, res) => {
  try {
    const poll = await Poll.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserPolls = async (req, res) => {
  try {
    const polls = await Poll.find({
      createdBy: req.user.id,
    });

    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSinglePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    if (!poll.isPublished) {
      return res.status(403).json({
        message: "Results not published yet",
      });
    }

    const responses = await Response.find({
      poll: poll._id,
    });

    const results = poll.questions.map((question, questionIndex) => {
      const optionCounts = {};

      question.options.forEach((option) => {
        optionCounts[option] = 0;
      });
      responses.forEach((response) => {
        const answer = response.answers.find(
          (answer) => answer.questionIndex === questionIndex,
        );
        if (answer) {
          optionCounts[answer.selectedOption]++;
        }
      });
      return {
        question: question.question,
        optionCounts,
      };
    });
    res.status(200).json({
      totalResponses: responses.length,

      results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    await Poll.findByIdAndDelete(req.params.id);

    await Response.deleteMany({
      poll: req.params.id,
    });

    res.status(200).json({
      message: "Poll deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const publishResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    poll.isPublished = true;

    await poll.save();
    res.status(200).json({
      message: "Result published",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
