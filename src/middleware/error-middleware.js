const { MulterError } = require('multer');
const { sendErrorResponse } = require('../utils/responseHelpers');
const InputError = require('../exceptions/InputError');

const errorMiddleware = (error, request, response, next) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof InputError) {
    sendErrorResponse(response, error.statusCode, error.message);
  } else if (error instanceof MulterError) {
    sendErrorResponse(response, 413, "Payload content length greater than maximum allowed: 1000000");
  } else {
    sendErrorResponse(response, 500, error.message);
  }
};

module.exports = { errorMiddleware };