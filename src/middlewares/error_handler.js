const errorHandler = (err, req, res, next) => {
   const message = err.message || "Something went wrong. Please try again later.";

   res.sendStatus(err.statusCode || 500).json({
      message,
   });
};

module.exports = errorHandler;
