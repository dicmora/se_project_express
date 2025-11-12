const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Custom URL validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

//Clothing item creation
const validateClothingItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2 characters',
      "string.max": 'The maximum length of the "name" field is 30 characters',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "string.empty": 'The "weather" field must be filled in',
      "any.only": 'The "weather" field must be one of "hot", "warm", "cold"',
      "any.required": 'The "weather" field is required',
    }),
  }),
});

//User creation
const validateUserCreation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2 characters',
      "string.max": 'The maximum length of the "name" field is 30 characters',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min":
        'The minimum length of the "password" field is 8 characters',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

//Login
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min":
        'The minimum length of the "password" field is 8 characters',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2 characters',
      "string.max": 'The maximum length of the "name" field is 30 characters',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field is required',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
      "any.required": 'The "avatar" field is required',
    }),
  }),
});

//ID validation for params
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24).messages({
      length: '"${paramName}" must be 24 characters long',
      "string.hex:": '"${paramName}" must be a valid hex string',
      "any.required": '"${paramName}" is required',
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserCreation,
  validateLogin,
  validateUserUpdate,
  validateId,
};
