const express = require("express");
const { postReview, getReviewList, updateReview, deleteReview, getUserReview } = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/postReview", verifyToken, postReview);
router.get("/getReviewList/:id", getReviewList);
router.get("/getUserReview/:id", getUserReview);
router.put("/updateReview/:id", verifyToken, updateReview);
router.delete("/deleteReview/:id", verifyToken, deleteReview);


module.exports = router;
