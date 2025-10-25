const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const clothingItemRouter = require("./routes/clothingItem");

const authMiddleware = require("./middlewares/auth");
const userRouter = require("./routes/users");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.post("/signin", login);
app.post("/signup", createUser);

// All /users routes with auth middleware
app.use("/users", authMiddleware, userRouter);

// All /items routes
app.use("/items", clothingItemRouter);

// 404 fallback
app.use((req, res) => res.status(404).send({ message: "Not Found" }));

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.warn(" Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.warn(`Server running on port ${PORT}`));
