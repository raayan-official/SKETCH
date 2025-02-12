const jwt = require("jsonwebtoken");
const JWT_KEY = require('../config/keys');
const generateToken = (user)=>{
    return jwt.sign({ email: user.email, userid: user._id}, process.env.JWT_KEY);
}



module.exports.generateToken = generateToken;