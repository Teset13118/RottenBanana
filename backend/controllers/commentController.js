const Comment = require("../models/Comment");

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

  exports.getCommentList = async (req, res) => {
    try {
      const { id } = req.params;
      const commentList = await Comment.find({ animeId: id }).populate("userId", "username");
      res.json(commentList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }