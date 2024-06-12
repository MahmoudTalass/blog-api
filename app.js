const createError = require("http-errors");
const express = require("express");
const errorHandler = require("./src/middlewares/error_handler");
const cors = require("cors");
const passport = require("passport");

require("dotenv").config();

const indexRouter = require("./src/routes/index");

const app = express();

// DB configuration
require("./src/configs/db.config");

// Passport configuration
require("./src/configs/passport.config");
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// API routes
app.use("/api", indexRouter);

// error handler
app.use(errorHandler);

module.exports = app;
