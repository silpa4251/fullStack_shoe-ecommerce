const Profile = require("../models/profileModel");

const viewProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ status:"failed", message: "Profile not found" });
    }
    res.status(200).json({status:"success",data:profile});
  } catch (error) {
    res.status(500).json({status:"failed", error: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const profile = await Profile.findOneAndUpdate({ userId }, updatedData, {
      new: true,
      upsert: true,
    });

    res.status(200).json({  status:"success",message: "Profile updated successfully", data: profile });
  } catch (error) {
    res.status(500).json({  status:"failed",error: error.message });
  }
};

module.exports = { viewProfile, editProfile };
