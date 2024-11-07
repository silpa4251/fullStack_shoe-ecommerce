const express = require("express");
require("dotenv").config();
const usersRoutes = require("./routes/usersRoutes");
const connect = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;
connect();

app.use("/users",usersRoutes)

app.listen(PORT , ()=>{
    console.log(`Server running on port: ${PORT}`)
})