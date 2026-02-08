const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
    {
        dialect: "postgres",
    }
);

class Conversation extends Model {}

Conversation.init(
    {
        conversation_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        user1_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user2_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        last_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        last_message_at: {
            type: DataTypes.DATE,
            allowNull: true,
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
        tableName: "conversations",
        timestamps: true,
    }
);

module.exports = Conversation;
