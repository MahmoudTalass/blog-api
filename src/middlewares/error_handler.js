const errorHandler = (err, req, res, next) => {
   const message = err.message || "Something went wrong. Please try again later.";
   const status = err.statusCode || 500;

   res.status(status).json({
      error: {
         status,
         message,
         errors: err.errors,
      },
   });
};

module.exports = errorHandler;
