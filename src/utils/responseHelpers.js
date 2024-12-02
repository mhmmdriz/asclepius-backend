const sendSuccessResponse = (response, data = null, statusCode = 200, message) => {
  const responseBody = {
    status: "success",
    message: message,
    data: data,
  };

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