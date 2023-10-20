"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            first_name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(30),
            },
            zip_code: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            registration_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            rating: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("users");
    },
};
