const Profile = require("../models/profileModel");

const viewProfile = async (req,res) => {
    try {
        const userId = req.params.id;
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const editProfile = async (req,res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const profile = await Profile.findOneAndUpdate({ userId }, updatedData, { new: true, upsert: true });
        
        res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {viewProfile , editProfile};