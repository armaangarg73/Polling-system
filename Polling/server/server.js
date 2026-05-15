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

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
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
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const activeParticipants = {};

io.on("connection", (socket) => {
  socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
    activeParticipants[pollId] = (activeParticipants[pollId] || 0) + 1;

    io.to(pollId).emit("participantCount", activeParticipants[pollId]);
  });
  socket.on("leavePoll", (pollId) => {
    
      removeParticipant(pollId);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        removeParticipant(room);
      }
    });
  });
  function removeParticipant(pollId) {
    if (!activeParticipants[pollId]) return;

    activeParticipants[pollId]--;

    if (activeParticipants[pollId] <= 0) {
      delete activeParticipants[pollId];

      io.to(pollId).emit("participantCount", 0);

      return;
    }

    io.to(pollId).emit("participantCount", activeParticipants[pollId]);
  }
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
