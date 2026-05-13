import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIndex: {
    type: Number,
    required: true,
  },

  selectedOption: {
    type: String,
    required: true,
  },
});

const responseSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    answers: [answerSchema],
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Response", responseSchema);
