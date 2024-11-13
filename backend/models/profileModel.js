const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profileimg: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
   
});

module.exports = mongoose.model("Profile", profileSchema);