class AppError extends Error {
   constructor(message, statusCode, errors = []) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
   }
}

class ValidationError extends AppError {
   constructor(errors) {
      super("ValidationError", 400, errors);
   }
}

module.exports = { AppError, ValidationError };
