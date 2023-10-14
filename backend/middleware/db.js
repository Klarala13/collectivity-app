const { Sequelize } = require("sequelize");
const sequelize = require("../config/config").development;

const db = new Sequelize(sequelize);

async function connectToDatabase() {
    try {
        await db.authenticate();
        console.log("Connected to the database.");

        await db.sync();
        console.log("Database synced");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = {
    connectToDatabase,
};
