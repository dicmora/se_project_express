const router = require("express").Router();
const userRouters = require("./users");
const itemRouters = require("./clothingItem");
const { NOT_FOUND } = require("../utils/httpErrors");

router.use("/users", userRouters);
router.use("/items", itemRouters);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
