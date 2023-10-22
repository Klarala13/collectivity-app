require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.TOKEN_LIFE,
    });
};

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

module.exports = {
    generateAccessToken,
    hashPassword,
};
