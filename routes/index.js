const router = require("express").Router();
const userRouters = require("./users");
const itemRouters = require("./clothingItem");

router.use("/users", userRouters);
router.use("/items", itemRouters);

module.exports = router;
