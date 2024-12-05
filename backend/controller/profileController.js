const Profile = require("../models/profileModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");

// View user profile
const viewProfile = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const profile = await Profile.findOne({ userId }).populate(
    "userId",
    "username email"
  );

  if (!profile) {
    throw new CustomError("Profile not found", 404);  
  }
  generateResponse(res, 200, "Profile retrieved successfully", { profile });
});


// Edit user profile
const editProfile = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const profile = await Profile.findOneAndUpdate({ userId }, updatedData, {
    new: true,
    upsert: true, // Creates a profile if one doesn’t exist

  }).populate("userId", "username email");

  if (!profile) {
    throw new CustomError("Profile update failed", 404);
  }
    generateResponse(res, 200, "Profile updated successfully", { profile });
});

const imageUpload = asyncErrorHandler(async(req,res) => {
  const userId = req.params.id;
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Image upload failed" });
  }
  console.log("file",req.file)
  const  updatedProfile = await Profile.findOneAndUpdate(
    { userId },
    { profileimg: req.file.path }, // Cloudinary URL
    { new: true, upsert: true }
  );

  res.status(200).json({
    message: "Image uploaded successfully",
    profile: updatedProfile,
  });
})

module.exports = { viewProfile, editProfile, imageUpload };
