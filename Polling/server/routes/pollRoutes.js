import express from "express";

import {
  createPoll,
  getUserPolls,
  getSinglePoll,
} from "../controllers/pollController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPoll);

router.get("/", authMiddleware, getUserPolls);

router.get("/:id", getSinglePoll);

export default router;
