const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required : true
    },
     email: {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        max_length : 15,
        min_length : 3,
        required : true
    },
    profileimg : {
        type: String
    }
             

},{timestamps : true})

module.exports = mongoose.model("users",userSchema);