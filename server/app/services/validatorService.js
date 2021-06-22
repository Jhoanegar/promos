const Joi = require("joi");

const basketIdValidator =  Joi.string().guid().required();

const productValidator = Joi.object({
  basketId: basketIdValidator,
  code: Joi.string().required(),
  quantity: Joi.number().required()
});


module.exports = {basketIdValidator, productValidator}
