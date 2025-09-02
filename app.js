const express = require("express");
const mongoose = require("mongoose");
const mainRouters = require("./routes/index");

const { PORT = 3001, BASE_PATH = "/" } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "68afa3dfb4797891104d10d8",
  };
  next();
});

app.use(express.json());
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
