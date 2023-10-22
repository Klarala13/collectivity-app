const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
    const token = req.header("x-access-token");

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Failed to authenticate token" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyAccessToken,
};