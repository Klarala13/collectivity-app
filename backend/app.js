require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const createError = require("http-errors");
const { setCorsHeaders } = require("./middleware/security");
const { genericErrors } = require("./lib/controllers/messageController");
const { connectToDatabase } = require("./config/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setCorsHeaders);

const usersRouter = require("./routes/users");
const freebiesRouter = require("./routes/freebies");

connectToDatabase();

app.use(logger("dev"));
app.use(express.json());

app.get("/", function (req, res) {
    console.log("Welcome to Collectivity");
    res.json({
        message: "Welcome to Collectivity! We're very happy to see you here :)",
    });
});

app.use("/user", usersRouter);
app.use("/freebies", freebiesRouter);

app.use((req, res, next) => {
    const error = new createError.NotFound();
    next(error);
});

app.use(genericErrors);

module.exports = app;
