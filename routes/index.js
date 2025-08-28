const router = require("express").Router();
const userRouters = require("./users");
const itemRouters = require("./items");

router.use("/users", userRouters);
router.use("/items", itemRouters);

module.exports = router;
