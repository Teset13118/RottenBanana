const mongoose = require("mongoose");
const moment = require("moment-timezone");

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    animeId: { type: String, required: true},
    animeName: { type: String, required: true},
    text: { type: String, required: true },
    score: { type: Number, required: true},
  },
  { timestamps: true }
);

// ใช้ moment-timezone เพื่อเปลี่ยนเวลาเป็น Bangkok
ReviewSchema.pre('save', function (next) {
  if (this.isNew) {
    const now = moment.tz("Asia/Bangkok").toDate();
    this.createdAt = now;
    this.updatedAt = now;
  } else {
    this.updatedAt = moment.tz("Asia/Bangkok").toDate();
  }
  next();
});

module.exports = mongoose.model("Review", ReviewSchema);
