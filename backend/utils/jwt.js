const jwt = require("jsonwebtoken");

const generateToken = (userId , role) => {
    return jwt.sign({userId , role}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_IN,
    })
}

// const generateRefreshToken = (userId) => {
//     return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
// };

const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

}

module.exports = {generateToken, verifyToken};