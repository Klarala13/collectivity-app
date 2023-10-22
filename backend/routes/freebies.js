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

/**
 * Freebie ROUTE
 *  /create:
 *   get:
 *     summary: Create a new Freebie
 *     description: Create a new freebie by user id
 *  @param req  The incoming request.
 *  @param res  The outgoing response.
 *  @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post("/create", async (req, res, next) => {
    const { user_id, item, description, image, zip_code, location, category } =
        req.body;

    try {
        const newFreebie = await Freebie.create({
            user_id: user_id,
            item: item,
            description: description,
            image: image,
            zip_code: zip_code,
            location: location,
            category: category,
        });

        res.json({ message: "Freebie added", data: newFreebie });
    } catch (error) {
        next(error);
    }
});


/**
 * Freebie ROUTE
 *  /update:
 *   get:
 *     summary: Update Freebie by item id
 *     description: Update any field in a freebie row
 *  @param req  The incoming request.
 *  @param res  The outgoing response.
 *  @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put("/update", async (req, res, next) => {
    const {
        user_id,
        item_id,
        item,
        description,
        image,
        zip_code,
        location,
        category,
    } = req.body;

    try {
        const updateFreebie = await Freebie.update(
            {
                user_id: user_id,
                item: item,
                description: description,
                image: image,
                zip_code: zip_code,
                location: location,
                category: category,
            },
            { where: { item_id: item_id } }
        );

        res.json({ message: "Freebie updated", data: updateFreebie });
    } catch (error) {
        next(error);
    }
});


/**
 * Freebie ROUTE
 *  /delete:
 *   get:
 *     summary: DELETE Freebie by item id
 *     description: Delete a freebie row
 *  @param req  The incoming request.
 *  @param res  The outgoing response.
 *  @param next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.delete("/delete", async (req, res, next) => {
    const {item_id} = req.body;

    try {
        const freebieToDelete = await Freebie.destroy(
            { where: { item_id: item_id } }
        );

        res.json({ message: "Freebie deleted", data: freebieToDelete });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
