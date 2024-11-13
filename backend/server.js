const express = require("express");
require("dotenv").config();
const app = require("./app")
const connect = require("./config/connection");

const PORT = process.env.PORT || 3000;

connect();

app.listen(PORT , ()=>{
    console.log(`Server running on port: ${PORT}`)
})