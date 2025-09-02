const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./errors");

const handleError = (err, res, resourceId, resourceName = "Resource") => {
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
  }

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
  }

  if (err.statusCode === NOT_FOUND) {
    return res
      .status(NOT_FOUND)
      .send({ message: `${resourceName} with ID ${resourceId} not found` });
  }

  console.error("Server error:", err);

  return res.status(INTERNAL_SERVER_ERROR).send({
    message: "An error has occurred on the server",
  });
};

module.exports = handleError;
