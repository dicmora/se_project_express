const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    minlength: [2, "Must be at least 2 characters"],
    maxlength: [30, "Must be at most 30 characters"],
  },
  avatar: {
    type: String,
    required: [true, "Avatar url is required"],
    validate: {
      validator: (value) => validator.isURL(value),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Invalid email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Invalid email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", userSchema);
