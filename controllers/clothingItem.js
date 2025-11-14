const ClothingItem = require("../models/clothingItem");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const getItemById = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!req.user || !req.user._id) {
    return next(new ForbiddenError("You must be logged in to delete an item"));
  }
  ClothingItem.findById(itemId);
  return ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then(() => ClothingItem.findByIdAndDelete(itemId))
    .then((deletedItem) => res.status(200).send(deletedItem))

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
