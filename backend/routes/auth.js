const express = require("express");
require("dotenv").config();
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
    generateAccessToken,
    hashPassword,
} = require("../helpers/authHelpers.js");

/**
 * Auth ROUTE
 * /register:
 *   post:
 *     summary: Register
 *     description:
 * @param req  The incoming request.
 * @param res  The outgoing response.
 * @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post("/register", async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, city, zip_code } =
            req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).json({ message: "Required information missing" });
        }

        const isRegistered = await User.findOne({ email });

        if (isRegistered) {
            return res
                .status(409)
                .json({ message: "User Already Exist. Please Login" });
        }

        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: await hashPassword(password),
            city: city,
            zip_code: zip_code,
        });

        res.json({ message: "User registered", data: user });
    } catch (error) {
        next(error);
    }
});

/**
 * Auth ROUTE
 * /login:
 *   post:
 *     summary: Login
 *     description:
 * @param req  The incoming request.
 * @param res  The outgoing response.
 * @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).json({ message: "All input is required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "No user found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        let payload = { userEmail: user.email };

        const token = await generateAccessToken(payload);

        res.setHeader("x-access-token", token);

        res.json({ token });
    } catch (error) {
        next(error);
    }
});

/**
 * Auth ROUTE
 * /logout:
 *   post:
 *     summary: Logout
 *     description:
 * @param req  The incoming request.
 * @param res  The outgoing response.
 * @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post("/logout", async (req, res, next) => {
    res.setHeader("x-access-token", "");
    const token = req.header("x-access-token");

    try {
        res.status(200).json({
            message: "Logged out successfully",
            token: token,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
