const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message: message.error || "An error has occurred on the server",
        });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: message.error || "Invalid user ID" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res
          .status(NOT_FOUND)
          .send({ message: "USER WITH ID ${userId} NOT FOUND" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message: message.error || "An error has occurred on the server",
        });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({
            message: message.error || "Invalid data passed when creating user",
          });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message: message.error || "An error has occurred on the server",
        });
    });
};

module.exports = { getUsers, createUser, getUserById };
