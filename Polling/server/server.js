import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/responses", responseRoutes);

app.get("/", (req, res) => {
  res.send("Api running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",

    methods: ["GET", "POST"],
  },
});


export { io };

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
