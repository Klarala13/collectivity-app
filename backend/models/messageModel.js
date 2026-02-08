const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
    {
        dialect: "postgres",
    }
);

class Message extends Model {}

Message.init(
    {
        message_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        sequelize,
        tableName: "messages",
        timestamps: true,
        updatedAt: false,
    }
);

module.exports = Message;
