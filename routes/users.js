const router = require("express").Router();
const {
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/usersController");

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
