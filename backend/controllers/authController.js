const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
 exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Login
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Wrong Username or Password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // let blacklistedTokens = [];
  // exports.blacklistedTokens = blacklistedTokens;

  //logout
  exports.logout = async (req, res) => {
    try {
      const token = req.header("Authorization").split(" ")[1];
      // blacklistedTokens.push(token);  // 👈 Add token to blacklist
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  //profile
  exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //otherprofile
  exports.getOtherUserProfile = async (req, res) => {
    try {
      const { userId } = req.params; // รับ userId จาก URL
      const user = await User.findById(userId).select("-password"); // ไม่ส่งค่า password กลับไป
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //update profile
  exports.updateProfile = async (req, res) => {
    try {
      const { nickname, about } = req.body;
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // อัปเดตเฉพาะฟิลด์ที่ส่งมา
      if (nickname !== undefined) user.nickname = nickname;
      if (about !== undefined) user.about = about;
  
      await user.save();
  
      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  