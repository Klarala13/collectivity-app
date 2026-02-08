const Message = require("../../models/messageModel");
const Conversation = require("../../models/conversationModel");
const User = require("../../models/userModel");
const { Op } = require("sequelize");

// Get all conversations for the authenticated user
const getUserConversations = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware

        const conversations = await Conversation.findAll({
            where: {
                [Op.or]: [{ user1_id: userId }, { user2_id: userId }],
            },
            order: [["last_message_at", "DESC"]],
        });

        // Enrich conversations with other user's info
        const enrichedConversations = await Promise.all(
            conversations.map(async (conv) => {
                const otherUserId = conv.user1_id === userId ? conv.user2_id : conv.user1_id;
                const otherUser = await User.findByPk(otherUserId, {
                    attributes: ["user_id", "first_name", "last_name", "image"],
                });

                return {
                    conversation_id: conv.conversation_id,
                    other_user: otherUser,
                    last_message: conv.last_message,
                    last_message_at: conv.last_message_at,
                    createdAt: conv.createdAt,
                    updatedAt: conv.updatedAt,
                };
            })
        );

        res.status(200).json({
            success: true,
            count: enrichedConversations.length,
            data: enrichedConversations,
        });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching conversations",
            error: error.message,
        });
    }
};

// Get or create conversation with another user
const getOrCreateConversation = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const { otherUserId } = req.params;

        // Validate other user exists
        const otherUser = await User.findByPk(otherUserId);
        if (!otherUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if user is trying to message themselves
        if (userId === otherUserId) {
            return res.status(400).json({
                success: false,
                message: "Cannot create conversation with yourself",
            });
        }

        // Check if conversation already exists (in either direction)
        let conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    { user1_id: userId, user2_id: otherUserId },
                    { user1_id: otherUserId, user2_id: userId },
                ],
            },
        });

        // Create conversation if it doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                user1_id: userId,
                user2_id: otherUserId,
            });
        }

        res.status(200).json({
            success: true,
            data: conversation,
        });
    } catch (error) {
        console.error("Error getting/creating conversation:", error);
        res.status(500).json({
            success: false,
            message: "Error getting/creating conversation",
            error: error.message,
        });
    }
};

// Get conversation with messages
const getConversationById = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const { conversationId } = req.params;

        const conversation = await Conversation.findByPk(conversationId);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // Check if user is part of the conversation
        if (conversation.user1_id !== userId && conversation.user2_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this conversation",
            });
        }

        // Get messages for this conversation
        const messages = await Message.findAll({
            where: { conversation_id: conversationId },
            include: [
                {
                    model: User,
                    attributes: ["user_id", "first_name", "last_name", "image"],
                },
            ],
            order: [["createdAt", "ASC"]],
        });

        // Get other user info
        const otherUserId = conversation.user1_id === userId ? conversation.user2_id : conversation.user1_id;
        const otherUser = await User.findByPk(otherUserId, {
            attributes: ["user_id", "first_name", "last_name", "image"],
        });

        res.status(200).json({
            success: true,
            data: {
                conversation_id: conversation.conversation_id,
                other_user: otherUser,
                messages: messages,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt,
            },
        });
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching conversation",
            error: error.message,
        });
    }
};

// Send a message
const sendMessage = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const { conversation_id, text, image } = req.body;

        // Validation
        if (!conversation_id || !text) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID and message text are required",
            });
        }

        // Verify conversation exists and user is part of it
        const conversation = await Conversation.findByPk(conversation_id);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        if (conversation.user1_id !== userId && conversation.user2_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to send messages in this conversation",
            });
        }

        // Create message
        const message = await Message.create({
            conversation_id,
            sender_id: userId,
            text,
            image,
        });

        // Update conversation's last message
        await conversation.update({
            last_message: text,
            last_message_at: new Date(),
        });

        // Fetch message with sender info
        const messageWithSender = await Message.findByPk(message.message_id, {
            include: [
                {
                    model: User,
                    attributes: ["user_id", "first_name", "last_name", "image"],
                },
            ],
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: messageWithSender,
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message,
        });
    }
};

module.exports = {
    getUserConversations,
    getOrCreateConversation,
    getConversationById,
    sendMessage,
};
