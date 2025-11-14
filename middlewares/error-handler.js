module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "An internal server error occurred" : message,
  });
};
