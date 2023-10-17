const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

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
router.get("/login", async (req, res, next) => {
    try {
        res.json({
            message: "Login",
        });
    } catch (error) {
        next(error);
    }
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id }, "yourSecretKey", {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
