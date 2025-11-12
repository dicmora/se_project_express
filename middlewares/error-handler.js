module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  const statusCode = err.status || err.status || 500;
  const isServerError = statusCode >= 500;

  const message = isServerError
    ? "Something went wrong"
    : err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    error: err.name || "Error",
    message,
    ...err(process.env.NODE_ENV === "production" && { stack: err.stack }),
  });
};
