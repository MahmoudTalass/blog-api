const createError = require("http-errors");
const express = require("express");

require("dotenv").config();
require("./src/configs/db.config");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   res.sendStatus(err.status || 500).json({ message: err.message });
});

module.exports = app;
