const User = require("../models/User");

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