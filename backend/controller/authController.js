const User = require("../models/userModel");
const asyncErroHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const {registerValidation,loginValidation,} = require("../validations/userValidations");
const CustomError = require("../utils/customError");
const { validateInput, generateResponse } = require("../utils/helpers");

const register = asyncErroHandler(async (req, res) => {
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
  generateResponse(res, 201, "User registered successfully", { token });
});


const login = asyncErroHandler(async (req, res) => {
  //Check for error in joi validation 
  validateInput(loginValidation, req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invaild credentials", 400);
  }

  const token = generateToken(user._id, user.role);
  generateResponse(res, 200, "Logged in successfully", { token });
});

module.exports = { register, login };
