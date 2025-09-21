const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICTERROR,
} = require("./httpErrors");

const handleError = (err, res, resourceId, resourceName = "Resource") => {
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
  }

  if (err.message === "Invalid email or password") {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }

  if (err.statusCode === CONFLICTERROR) {
    return res.status(CONFLICTERROR).send({ message: err.message });
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
