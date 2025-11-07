module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).jsson({
    success: false,
    message,
    ...(err(process.env.NODE_ENV !== "production") && { stack: err.stack }),
  });
};
