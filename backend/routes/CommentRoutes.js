const express = require("express");
const { postComment, getCommentList } = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/postComment", verifyToken, postComment);
router.get("/getCommentList/:id", getCommentList);

module.exports = router;
