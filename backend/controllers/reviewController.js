const Review = require("../models/Review");

exports.getReviewList = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewList = await Review.find({ animeId: id }).populate("userId", "username").sort({ createdAt: -1 });
    res.json(reviewList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.postReview = async (req, res) => {
  try {
    const { animeId, animeName, animePic ,text, score } = req.body;
    const userId = req.user.id;

    const newReview = new Review({ userId, animeId, animeName, animePic ,text, score });
    await newReview.save();

    res.status(201).json({ message: "User Review successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params; // Review ID
    const { text, score } = req.body;
    const userId = req.user.id; // ดึง user ID จาก JWT

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found"});

    // ตรวจสอบว่าเป็นเจ้าของคอมเมนต์หรือไม่
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this review" });
    }

    // อัปเดตข้อมูล
    review.text = text || review.text;
    review.score = score || review.score;
    await review.save();

    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params; // Review ID
    const userId = req.user.id; // ดึง user ID จาก JWT

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // ตรวจสอบว่าเป็นเจ้าของคอมเมนต์หรือไม่
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    await Review.findByIdAndDelete(id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserReview = async (req,res) => {
  try {
    const { id } = req.params;
    const userReview = await Review.find({ userId: id }).populate("userId", "username");
    res.json(userReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};