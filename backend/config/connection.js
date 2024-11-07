const mongoose = require("mongoose");

const connectDb = async()=>{
    try{
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("MongoDb connected")
    } catch(err) {
        console.error("error in connecting",err);
    }
}

module.exports = connectDb;