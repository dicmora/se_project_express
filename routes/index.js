const router = require("express").Router();
const userRouters = require("./users");
const itemRouters = require("./clothingItem");
const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", userRouters);
router.use("/items", itemRouters);

module.exports = router;
