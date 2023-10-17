const express = require("express");
const Freebie = require("../models/freebieModel");
const router = express.Router();

/**
 * Freebie ROUTE
 * /freebie:
 *   get:
 *     summary: Display list of freebies
 *     description: Render all freebies from database
 * @param req  The incoming request.
 * @param res  The outgoing response.
 * @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/", async (req, res, next) => {
    try {
        const freebies = await Freebie.findAll();
        res.json({
            message: { freebies },
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Freebie ROUTE
 *  /item/:item_id:
 *   get:
 *     summary: One Freebie
 *     description: Render Freebie by item ID
 *  @param req  The incoming request.
 *  @param res  The outgoing response.
 *  @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/item/:item_id", async (req, res, next) => {
    const freebieId = req.params.item_id;
    if (freebieId) {
        try {
            const oneFreebie = await Freebie.findOne({
                where: { item_id: freebieId },
            });
            res.json({
                message: { oneFreebie },
            });
        } catch (error) {
            next(error);
        }
    }
});

/**
 * Freebie ROUTE
 *  /user/:user_id:
 *   get:
 *     summary: All Freebies that a user has
 *     description: Render all Freebies by user ID
 *  @param req  The incoming request.
 *  @param res  The outgoing response.
 *  @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get("/user/:user_id", async (req, res, next) => {
    const userId = req.params.user_id;
    if (userId) {
        try {
            const allFreebieByUser = await Freebie.findAll({
                where: { user_id: userId },
            });
            res.json({
                message: { allFreebieByUser },
            });
        } catch (error) {
            next(error);
        }
    }
});

module.exports = router;
