const createError = require("http-errors");
const express = require("express");
const errorHandler = require("./src/middlewares/error_handler");
const cors = require("cors");

require("dotenv").config();
require("./src/configs/db.config");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
