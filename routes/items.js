const router = require("express").Router();
const {
  getItems,
  getItemById,
  createItem,
  likeItem,
  unlikeItem,
} = require("../controllers/items");

router.get("/", getItems);
router.get("/:itemId", getItemById);
router.post("/", createItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
