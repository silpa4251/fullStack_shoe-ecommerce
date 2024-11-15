const Profile = require("../models/profileModel");
const asyncErroHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");

// View user profile
const viewProfile = asyncErroHandler(async (req, res) => {
  const userId = req.params.id;
  const profile = await Profile.findOne({ userId });

  if (!profile) {
    throw new CustomError("Profile not found", 404);  
  }
  generateResponse(res, 200, "Profile retrieved successfully", { profile });
});


// Edit user profile
const editProfile = asyncErroHandler(async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const profile = await Profile.findOneAndUpdate({ userId }, updatedData, {
    new: true,
    upsert: true, // Creates a profile if one doesn’t exist

  });

    generateResponse(res, 200, "Profile updated successfully", { profile });
});

module.exports = { viewProfile, editProfile };
