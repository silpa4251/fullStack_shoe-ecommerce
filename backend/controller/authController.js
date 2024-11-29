const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const {registerValidation,loginValidation,} = require("../validations/userValidations");
const CustomError = require("../utils/customError");
const { validateInput, generateResponse } = require("../utils/helpers");

// Registering a new user
const register = asyncErrorHandler(async (req, res) => {
  //Check for error in joi validation 
  validateInput(registerValidation,req.body);
  const { username, email, password, role } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exits !", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newuser = new User({username,email,password: hashedPassword,role,});
  await newuser.save();

  const token = generateToken(newuser._id, newuser.role);
  res.status(201).json({ status: "success", message: "User registered successfully", token})
});


//Login a user
const login = asyncErrorHandler(async (req, res) => {
  //Check for error in joi validation 
  validateInput(loginValidation, req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invaild credentials", 400);
  }

  const token = generateToken(user._id, user.role);
  res.status(200).json({ status: "success", message: "User logged in successfully", token , user})
});

module.exports = { register, login };
