const express = require("express");
require("dotenv").config();

const connect = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

const usersRoutes = require("./routes/usersRoutes");
app.use("/api/users",usersRoutes)


app.listen(PORT , ()=>{
    console.log(`Server running on port: ${PORT}`)
})