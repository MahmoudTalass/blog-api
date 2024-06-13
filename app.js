const createError = require("http-errors");
const express = require("express");
const errorHandler = require("./src/middlewares/error_handler");
const cors = require("cors");
const passport = require("passport");

const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
   windowMs: 1 * 60 * 1000, // 1 minute
   max: 20,
});

require("dotenv").config();

const indexRouter = require("./src/routes/index");

const app = express();

// DB configuration
require("./src/configs/db.config");

// Passport configuration
require("./src/configs/passport.config");
app.use(passport.initialize());

app.use(compression());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// API routes
app.use("/api", indexRouter);

// error handler
app.use(errorHandler);

module.exports = app;
