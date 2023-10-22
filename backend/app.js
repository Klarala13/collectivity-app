require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const { setCorsHeaders } = require("./middleware/security");
const { genericErrors } = require("./middleware/errorHandler");
const { connectToDatabase } = require("./config/db");

const app = express();
app.use(setCorsHeaders);

const usersRouter = require("./routes/users");
const freebiesRouter = require("./routes/freebies");
const authRouter = require("./routes/auth");

const { verifyAccessToken } = require("./middleware/tokenHandler");

connectToDatabase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.json({
        message: "Welcome to Collectivity! We're very happy to see you here :)",
    });
});

app.use("/auth", authRouter);
app.use("/user", verifyAccessToken, usersRouter);
app.use("/freebie", verifyAccessToken, freebiesRouter);

app.use((req, res, next) => {
    const error = new createError.NotFound();
    next(error);
});

app.use(genericErrors);

module.exports = app;
