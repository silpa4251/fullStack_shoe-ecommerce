const express = require("express");
const { viewProfile, editProfile } = require("../controller/profileController");
const profileRouter = express.Router();
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

profileRouter.use(auth);
profileRouter.use(authorize("user"));

profileRouter.route("/:id")
    .get( viewProfile)
    .put( editProfile);

module.exports = profileRouter;
