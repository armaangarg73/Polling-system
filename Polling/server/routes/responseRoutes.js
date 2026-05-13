import express from "express";

import { submitResponse } from "../controllers/responseController.js";
import optionalAuthMiddleware from "../middleware/optionalAuthMiddleware.js";


const router = express.Router();

router.post("/", optionalAuthMiddleware, submitResponse);

export default router;
