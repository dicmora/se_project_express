const ClothingItem = require("../models/item");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message: message.error || "An error has occurred on the server",
        });
    });
};

const getItemById = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: message.error || "Invalid item ID" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res
          .status(NOT_FOUND)
          .send({ message: `ITEM WITH ID ${itemId} NOT FOUND` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: message.error || "An error has occurred on the server",
      });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({
            message: message.error || "Invalid data passed when creating item",
          });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: message.error || "Invalid item ID" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res
          .status(NOT_FOUND)
          .send({ message: `ITEM WITH ID ${itemId} NOT FOUND` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message: message.error || "An error has occurred on the server",
        });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: message.error || "Invalid item ID" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res
          .status(NOT_FOUND)
          .send({ message: `ITEM WITH ID ${itemId} NOT FOUND` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message: message.error || "An error has occurred on the server",
        });
    });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  likeItem,
  unlikeItem,
};
