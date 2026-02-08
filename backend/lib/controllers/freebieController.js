const Freebie = require("../../models/freebieModel");
const User = require("../../models/userModel");

// Get all freebies
const getAllFreebies = async (req, res) => {
    try {
        const freebies = await Freebie.findAll({
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
            count: freebies.length,
            data: freebies,
        });
    } catch (error) {
        console.error("Error fetching freebies:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching freebies",
            error: error.message,
        });
    }
};

// Get single freebie by ID
const getFreebieById = async (req, res) => {
    try {
        const { id } = req.params;

        const freebie = await Freebie.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ["user_id", "first_name", "last_name", "image", "rating", "city"],
                },
            ],
        });

        if (!freebie) {
            return res.status(404).json({
                success: false,
                message: "Freebie not found",
            });
        }

        res.status(200).json({
            success: true,
            data: freebie,
        });
    } catch (error) {
        console.error("Error fetching freebie:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching freebie",
            error: error.message,
        });
    }
};

// Create new freebie (authenticated)
const createFreebie = async (req, res) => {
    try {
        const { item, description, category, image, zip_code, location } = req.body;
        const user_id = req.userId; // From auth middleware

        // Validation
        if (!item || !category) {
            return res.status(400).json({
                success: false,
                message: "Item name and category are required",
            });
        }

        const freebie = await Freebie.create({
            item,
            description,
            category,
            image,
            zip_code,
            location,
            user_id,
        });

        res.status(201).json({
            success: true,
            message: "Freebie created successfully",
            data: freebie,
        });
    } catch (error) {
        console.error("Error creating freebie:", error);
        res.status(500).json({
            success: false,
            message: "Error creating freebie",
            error: error.message,
        });
    }
};

// Update freebie (owner only)
const updateFreebie = async (req, res) => {
    try {
        const { id } = req.params;
        const { item, description, category, image, zip_code, location } = req.body;
        const user_id = req.userId; // From auth middleware

        const freebie = await Freebie.findByPk(id);

        if (!freebie) {
            return res.status(404).json({
                success: false,
                message: "Freebie not found",
            });
        }

        // Check if user is the owner
        if (freebie.user_id !== user_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this freebie",
            });
        }

        // Update fields
        await freebie.update({
            item: item || freebie.item,
            description: description !== undefined ? description : freebie.description,
            category: category || freebie.category,
            image: image !== undefined ? image : freebie.image,
            zip_code: zip_code !== undefined ? zip_code : freebie.zip_code,
            location: location !== undefined ? location : freebie.location,
        });

        res.status(200).json({
            success: true,
            message: "Freebie updated successfully",
            data: freebie,
        });
    } catch (error) {
        console.error("Error updating freebie:", error);
        res.status(500).json({
            success: false,
            message: "Error updating freebie",
            error: error.message,
        });
    }
};

// Delete freebie (owner only)
const deleteFreebie = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.userId; // From auth middleware

        const freebie = await Freebie.findByPk(id);

        if (!freebie) {
            return res.status(404).json({
                success: false,
                message: "Freebie not found",
            });
        }

        // Check if user is the owner
        if (freebie.user_id !== user_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this freebie",
            });
        }

        await freebie.destroy();

        res.status(200).json({
            success: true,
            message: "Freebie deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting freebie:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting freebie",
            error: error.message,
        });
    }
};

// Get freebies by user ID
const getFreebiesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const freebies = await Freebie.findAll({
            where: { user_id: userId },
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            success: true,
            count: freebies.length,
            data: freebies,
        });
    } catch (error) {
        console.error("Error fetching user freebies:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user freebies",
            error: error.message,
        });
    }
};

module.exports = {
    getAllFreebies,
    getFreebieById,
    createFreebie,
    updateFreebie,
    deleteFreebie,
    getFreebiesByUserId,
};
