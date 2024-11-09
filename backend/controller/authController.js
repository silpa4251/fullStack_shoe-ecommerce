const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req,res) =>{
    try{
        
        const {username , email , password , profileimg} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }

        const existingUser = await User.findOne({ email });
        if( existingUser ) {
            return res.status(400).json({ message : "User already exits !"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newuser = new User ({ username , email , password : hashedPassword , profileimg });
        await newuser.save();

        const token = jwt.sign({ userId : newuser._id} , process.env.ACCESS_TOKEN_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN});
        res.status(201).json({ message : "User registered successfully" , token});

    } catch (error) {
        console.error(error)
        res.status(500).json({ message : " server error"});
    }
}
const login =  async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ meassage: "Invaild credentials"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({ message : "Invalid credentials"});
        }

        const token = jwt.sign({ userId : user._id} , process.env.ACCESS_TOKEN_SECRET , {expiresIn: process.env.JWT_EXPIRES_IN});
        res.json({ message : "Logged in successfully" , token});
        
    } catch(error) {
        res.status(500).json({ message : "Server error"});
    }
}
module.exports = { register, login}