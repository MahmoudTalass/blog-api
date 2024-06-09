const errorHandler = (err, req, res, next) => {
   const message = err.message || "Something went wrong. Please try again later.";

   res.sendStatus(err.status || 500).json({
      message,
   });
};

module.exports = errorHandler;
