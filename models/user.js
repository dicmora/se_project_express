const mongoose = require("mongoose");
const validator = require("validator");

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
});

module.exports = mongoose.model("User", userSchema);
