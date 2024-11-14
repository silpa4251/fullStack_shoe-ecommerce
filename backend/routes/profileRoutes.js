const express = require("express");
const { viewProfile, editProfile } = require("../controller/profileController");
const router = express.Router();
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

router.use(auth);
router.use(authorize("user"));

 router.route("/:id")
    .get( viewProfile)
    .put( editProfile);

module.exports = router;
