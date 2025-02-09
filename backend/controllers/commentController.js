const Comment = require("../models/Comment");

exports.getCommentList = async (req, res) => {
  try {
    const { id } = req.params;
    const commentList = await Comment.find({ animeId: id }).populate("userId", "username");
    res.json(commentList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.postComment = async (req, res) => {
  try {
    const { animeId, text, score } = req.body;
    const userId = req.user.id;

    const newComment = new Comment({ userId, animeId, text, score });
    await newComment.save();

    res.status(201).json({ message: "User Comment successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params; // Comment ID
    const { text, score } = req.body;
    const userId = req.user.id; // ดึง user ID จาก JWT

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found"});

    // ตรวจสอบว่าเป็นเจ้าของคอมเมนต์หรือไม่
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }

    // อัปเดตข้อมูล
    comment.text = text || comment.text;
    comment.score = score || comment.score;
    await comment.save();

    res.json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Comment ID
    const userId = req.user.id; // ดึง user ID จาก JWT

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // ตรวจสอบว่าเป็นเจ้าของคอมเมนต์หรือไม่
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
