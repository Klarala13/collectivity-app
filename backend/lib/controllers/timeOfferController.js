const TimeOffer = require("../../models/timeOfferModel");
const User = require("../../models/userModel");

// Get all time offers
const getAllTimeOffers = async (req, res) => {
    try {
        const timeOffers = await TimeOffer.findAll({
            include: [
                {
                    model: User,
                    attributes: ["user_id", "first_name", "last_name", "image", "rating"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            success: true,
            count: timeOffers.length,
            data: timeOffers,
        });
    } catch (error) {
        console.error("Error fetching time offers:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching time offers",
            error: error.message,
        });
    }
};

// Get single time offer by ID
const getTimeOfferById = async (req, res) => {
    try {
        const { id } = req.params;

        const timeOffer = await TimeOffer.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ["user_id", "first_name", "last_name", "image", "rating", "city"],
                },
            ],
        });

        if (!timeOffer) {
            return res.status(404).json({
                success: false,
                message: "Time offer not found",
            });
        }

        res.status(200).json({
            success: true,
            data: timeOffer,
        });
    } catch (error) {
        console.error("Error fetching time offer:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching time offer",
            error: error.message,
        });
    }
};

// Create new time offer (authenticated)
const createTimeOffer = async (req, res) => {
    try {
        const { title, description, category, availability, image, zip_code, location } = req.body;
        const user_id = req.userId; // From auth middleware

        // Validation
        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: "Title and category are required",
            });
        }

        const timeOffer = await TimeOffer.create({
            title,
            description,
            category,
            availability,
            image,
            zip_code,
            location,
            user_id,
        });

        res.status(201).json({
            success: true,
            message: "Time offer created successfully",
            data: timeOffer,
        });
    } catch (error) {
        console.error("Error creating time offer:", error);
        res.status(500).json({
            success: false,
            message: "Error creating time offer",
            error: error.message,
        });
    }
};

// Update time offer (owner only)
const updateTimeOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, availability, image, zip_code, location } = req.body;
        const user_id = req.userId; // From auth middleware

        const timeOffer = await TimeOffer.findByPk(id);

        if (!timeOffer) {
            return res.status(404).json({
                success: false,
                message: "Time offer not found",
            });
        }

        // Check if user is the owner
        if (timeOffer.user_id !== user_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this time offer",
            });
        }

        // Update fields
        await timeOffer.update({
            title: title || timeOffer.title,
            description: description !== undefined ? description : timeOffer.description,
            category: category || timeOffer.category,
            availability: availability !== undefined ? availability : timeOffer.availability,
            image: image !== undefined ? image : timeOffer.image,
            zip_code: zip_code !== undefined ? zip_code : timeOffer.zip_code,
            location: location !== undefined ? location : timeOffer.location,
        });

        res.status(200).json({
            success: true,
            message: "Time offer updated successfully",
            data: timeOffer,
        });
    } catch (error) {
        console.error("Error updating time offer:", error);
        res.status(500).json({
            success: false,
            message: "Error updating time offer",
            error: error.message,
        });
    }
};

// Delete time offer (owner only)
const deleteTimeOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.userId; // From auth middleware

        const timeOffer = await TimeOffer.findByPk(id);

        if (!timeOffer) {
            return res.status(404).json({
                success: false,
                message: "Time offer not found",
            });
        }

        // Check if user is the owner
        if (timeOffer.user_id !== user_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this time offer",
            });
        }

        await timeOffer.destroy();

        res.status(200).json({
            success: true,
            message: "Time offer deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting time offer:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting time offer",
            error: error.message,
        });
    }
};

// Get time offers by user ID
const getTimeOffersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const timeOffers = await TimeOffer.findAll({
            where: { user_id: userId },
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            success: true,
            count: timeOffers.length,
            data: timeOffers,
        });
    } catch (error) {
        console.error("Error fetching user time offers:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user time offers",
            error: error.message,
        });
    }
};

module.exports = {
    getAllTimeOffers,
    getTimeOfferById,
    createTimeOffer,
    updateTimeOffer,
    deleteTimeOffer,
    getTimeOffersByUserId,
};
