const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
    {
        dialect: "postgres",
    }
);

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        first_name: {
            type: DataTypes.STRING(30),
        },
        last_name: {
            type: DataTypes.STRING(30),
        },
        email: {
            type: DataTypes.STRING(30),
        },
        password: {
            type: DataTypes.STRING(255), // Increased length for hashed password
        },
        city: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        zip_code: {
            type: DataTypes.INTEGER,
        },
        registration_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
    }
);

// Hash password before creating user
User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Hash password before updating user
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Instance method to compare passwords
User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
