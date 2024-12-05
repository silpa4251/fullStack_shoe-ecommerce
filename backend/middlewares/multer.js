
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowable file formats
  },
});

const upload = multer({ storage });

module.exports = upload;
