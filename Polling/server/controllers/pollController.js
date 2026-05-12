import Poll from "../models/Poll.js";

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
