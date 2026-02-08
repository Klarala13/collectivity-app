const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
    {
        dialect: "postgres",
    }
);

class TimeOffer extends Model {}

TimeOffer.init(
    {
        offer_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        availability: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        sequelize,
        tableName: "timeoffers",
        timestamps: true,
    }
);

module.exports = TimeOffer;
