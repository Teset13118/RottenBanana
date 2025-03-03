const express = require("express");
const { getProfile, getOtherUserProfile, updateProfile } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.get("/profile/:userId", getOtherUserProfile);
router.put("/update/profile", verifyToken, updateProfile);

module.exports = router;
