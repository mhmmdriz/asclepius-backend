const sendSuccessResponse = (response, data = null, statusCode = 200, message = null) => {
  const responseBody = {
    status: "success",
  };

  if (message) {
    responseBody.message = message;
  }

  if (data) {
    responseBody.data = data;
  }

  response.status(statusCode).json(responseBody);
};

const sendErrorResponse = (response, statusCode, message) => {
  response.status(statusCode).json({
    status: "fail",
    message: message,
  }).end();
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};