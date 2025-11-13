const express = require("express");
const {
  getItems,
  getItemById,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");
const { validateId } = require("../middlewares/validation");

const router = express.Router();

// Public route
router.get("/", getItems);

// Everything below requires auth
router.use(auth);

router.get("/:itemId", validateId, getItemById);
router.post("/", createItem);
router.delete("/:itemId", validateId, deleteItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, unlikeItem);

module.exports = router;
