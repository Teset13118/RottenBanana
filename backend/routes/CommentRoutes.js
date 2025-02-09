const express = require("express");
const { postComment, getCommentList, updateComment, deleteComment } = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/postComment", verifyToken, postComment);
router.get("/getCommentList/:id", getCommentList);
router.put("/updateComment/:id", verifyToken, updateComment);
router.delete("/deleteComment/:id", verifyToken, deleteComment);


module.exports = router;
