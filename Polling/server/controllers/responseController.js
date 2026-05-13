import Response from "../models/Response.js";

export const submitResponse = async (req, res) => {
  try {
    const { pollId, answers } = req.body;

    const response = await Response.create({
      poll: pollId,
      user: req.user?.id || null,
      answers,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
