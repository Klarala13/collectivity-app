const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const {
    getAllTimeOffers,
    getTimeOfferById,
    createTimeOffer,
    updateTimeOffer,
    deleteTimeOffer,
    getTimeOffersByUserId,
} = require("../lib/controllers/timeOfferController");

// Validation middleware
const validateTimeOfferId = [
    param("id").isUUID().withMessage("Invalid time offer ID format"),
];

const validateCreateTimeOffer = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters"),
    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
    body("availability")
        .optional()
        .trim(),
    body("image")
        .optional()
        .trim(),
    body("zip_code")
        .optional()
        .isInt()
        .withMessage("Zip code must be a number"),
    body("location")
        .optional()
        .trim(),
];

const validateUpdateTimeOffer = [
    param("id").isUUID().withMessage("Invalid time offer ID format"),
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters"),
    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),
    body("availability")
        .optional()
        .trim(),
    body("image")
        .optional()
        .trim(),
    body("zip_code")
        .optional()
        .isInt()
        .withMessage("Zip code must be a number"),
    body("location")
        .optional()
        .trim(),
];

const validateUserId = [
    param("userId").isUUID().withMessage("Invalid user ID format"),
];

// Public routes
router.get("/", getAllTimeOffers);
router.get("/:id", validateTimeOfferId, getTimeOfferById);
router.get("/user/:userId", validateUserId, getTimeOffersByUserId);

// Protected routes (require authentication)
router.post("/", authMiddleware, validateCreateTimeOffer, createTimeOffer);
router.patch("/:id", authMiddleware, validateUpdateTimeOffer, updateTimeOffer);
router.delete("/:id", authMiddleware, validateTimeOfferId, deleteTimeOffer);

module.exports = router;
