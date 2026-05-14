import express from "express";

import {
  createPoll,
  getUserPolls,
  getSinglePoll,
  getPollResults,
  deletePoll,
  publishResults
} from "../controllers/pollController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPoll);

router.get("/", authMiddleware, getUserPolls);

router.get("/:id/results", getPollResults);
router.get("/:id", getSinglePoll);
router.delete("/:id", authMiddleware, deletePoll);
router.patch("/:id/publish", authMiddleware, publishResults);
export default router;
