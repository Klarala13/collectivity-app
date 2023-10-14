"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("freebies", {
            item_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            item: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(300),
            },
            image: {
                type: Sequelize.STRING,
            },
            zip_code: {
                type: Sequelize.INTEGER,
            },
            location: {
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isIn: [
                        [
                            "House_Garden",
                            "Fashion",
                            "Motors",
                            "Entertainment",
                            "Electronics",
                            "Art_Collectibles",
                            "Sports",
                            "Toys",
                            "Media",
                            "Pets",
                            "Others",
                        ],
                    ],
                },
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "user_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable("freebies");
    },
};
