const express = require("express");
const {
  getItems,
  getItemById,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

const publicRouter = express.Router();
publicRouter.get("/", getItems);

const protectedRouter = express.Router();
protectedRouter.get("/:itemId", getItemById);
protectedRouter.post("/", createItem);
protectedRouter.delete("/:itemId", deleteItem);
protectedRouter.put("/:itemId/likes", likeItem);
protectedRouter.delete("/:itemId/likes", unlikeItem);
module.exports = { publicRouter, protectedRouter };
