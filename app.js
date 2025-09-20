const cor = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mainRouters = require("./routes/index");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");

const { PORT = 3001, BASE_PATH = "/" } = process.env;
const app = express();

app.use(cor());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);
app.use(BASE_PATH, mainRouters);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.warn("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.warn(`App listening on port ${PORT}`);
});
