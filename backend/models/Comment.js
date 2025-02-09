const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    animeId: { type: String, required: true},
    text: { type: String, required: true },
    score: { type: Number, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);