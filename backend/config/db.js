const { Sequelize } = require("sequelize");
const config = require("./config").development;

const db = new Sequelize(config);

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
    db,
    connectToDatabase,
};
