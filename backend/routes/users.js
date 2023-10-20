const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

/**
 * Users ROUTE
 * /users:
 *   get:
 *     summary: Display list of users
 *     description: Render all users from database
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json({
            message: { users },
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
