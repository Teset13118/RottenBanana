const express = require("express");
const { register, login, logout, getProfile } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
