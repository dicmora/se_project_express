const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const handleError = require("../utils/handleErrors");
const { NOT_FOUND, BAD_REQUEST, CONFLICT } = require("../utils/httpErrors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res));
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcript.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(201).send(userWithoutPassword);
      })
      .catch((err) => {
        if (err.code === 11000) {
          const CONFLICTERROR = new Error(
            "User with this email already exists"
          );
          CONFLICTERROR.statusCode = CONFLICT;
          return handleError(CONFLICTERROR, res);
        }
        return handleError(err, res);
      });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => handleError(err, res));
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((updateUser) => res.send(updateUser))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  login,
  updateCurrentUser,
};
