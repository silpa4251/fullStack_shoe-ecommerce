const express = require("express");
const { viewProfile, editProfile, imageUpload } = require("../controller/profileController");
const profileRouter = express.Router();
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const upload = require("../middlewares/multer");

profileRouter.use(auth);
profileRouter.use(authorize("user"));

profileRouter.route("/:id")
    .get( viewProfile)
    .put( editProfile);
profileRouter.post("/upload/:id",upload.single("profileimg"),imageUpload)
module.exports = profileRouter;
