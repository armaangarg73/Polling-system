import Response from "../models/Response.js";
import Poll from "../models/Poll.js";
import { io } from "../server.js";

export const submitResponse = async (req, res) => {
  try {
    const { pollId, answers } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    if (poll.expiresAt && new Date() > poll.expiresAt) {
      return res.status(400).json({
        message: "Poll has expired",
      });
    }

    const response = await Response.create({
      poll: pollId,
      user: req.user?.id || null,
      answers,
    });
    io.emit(`pollUpdated-${pollId}`)
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
