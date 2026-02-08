const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const {
    getUserConversations,
    getOrCreateConversation,
    getConversationById,
    sendMessage,
} = require("../lib/controllers/chatController");

// Validation middleware
const validateConversationId = [
    param("conversationId").isUUID().withMessage("Invalid conversation ID format"),
];

const validateUserId = [
    param("otherUserId").isUUID().withMessage("Invalid user ID format"),
];

const validateSendMessage = [
    body("conversation_id")
        .isUUID()
        .withMessage("Valid conversation ID is required"),
    body("text")
        .trim()
        .notEmpty()
        .withMessage("Message text is required"),
    body("image")
        .optional()
        .trim(),
];

// All routes require authentication
router.use(authMiddleware);

// Get all conversations for authenticated user
router.get("/conversations", getUserConversations);

// Get or create conversation with another user
router.get("/conversations/user/:otherUserId", validateUserId, getOrCreateConversation);

// Get conversation by ID with all messages
router.get("/conversations/:conversationId", validateConversationId, getConversationById);

// Send a message
router.post("/", validateSendMessage, sendMessage);

module.exports = router;
