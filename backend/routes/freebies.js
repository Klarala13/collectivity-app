const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const {
    getAllFreebies,
    getFreebieById,
    createFreebie,
    updateFreebie,
    deleteFreebie,
    getFreebiesByUserId,
} = require("../lib/controllers/freebieController");

// Validation middleware
const validateFreebieId = [
    param("id").isUUID().withMessage("Invalid freebie ID format"),
];

const validateCreateFreebie = [
    body("item")
        .trim()
        .notEmpty()
        .withMessage("Item name is required")
        .isLength({ max: 30 })
        .withMessage("Item name must not exceed 30 characters"),
    body("description")
        .optional()
        .isLength({ max: 300 })
        .withMessage("Description must not exceed 300 characters"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
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

const validateUpdateFreebie = [
    param("id").isUUID().withMessage("Invalid freebie ID format"),
    body("item")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Item name cannot be empty")
        .isLength({ max: 30 })
        .withMessage("Item name must not exceed 30 characters"),
    body("description")
        .optional()
        .isLength({ max: 300 })
        .withMessage("Description must not exceed 300 characters"),
    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),
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
router.get("/", getAllFreebies);
router.get("/:id", validateFreebieId, getFreebieById);
router.get("/user/:userId", validateUserId, getFreebiesByUserId);

// Protected routes (require authentication)
router.post("/", authMiddleware, validateCreateFreebie, createFreebie);
router.patch("/:id", authMiddleware, validateUpdateFreebie, updateFreebie);
router.delete("/:id", authMiddleware, validateFreebieId, deleteFreebie);

module.exports = router;
