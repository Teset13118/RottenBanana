const express = require("express");
const { register, login, logout, getProfile, getOtherUserProfile, updateProfile } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getProfile);
router.get("/profile/:userId", getOtherUserProfile);
router.put("/update/profile", verifyToken, updateProfile);

module.exports = router;
