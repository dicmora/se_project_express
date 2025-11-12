const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/usersController");
const clothingItemRouter = require("./routes/clothingItem");

const authMiddleware = require("./middlewares/auth");
const userRouter = require("./routes/users");

const { PORT = 3001 } = process.env;
const app = express();
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateLogin,
  validateUserCreation,
} = require("./middlewares/validation");

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Auth routes
app.post("/signin", validateLogin, login);

app.post("/signup", validateUserCreation, createUser);

// All /users routes with auth middleware
app.use("/users", authMiddleware, userRouter);
// All /items routes
app.use("/items", clothingItemRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.warn(" Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.warn(`Server running on port ${PORT}`));
