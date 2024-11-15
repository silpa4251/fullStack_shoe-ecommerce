const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidations");

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({status:"failed", message: error.details[0].message });

  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ status:"failed" , message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status:"failed" ,message: "User already exits !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newuser.save();

    const token = generateToken(newuser._id, newuser.role);
    res.status(201).json({ status:"success" , message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ status:"failed", error: error.message });
  
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ status:"failed",message: error.details[0].message });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status:"failed", meassage: "Invaild credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status:"failed",message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    res.json({ status:"success",message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

module.exports = { register, login };
