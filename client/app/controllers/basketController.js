const { addBasket, addProductToBasket, getDetails, deleteBasketById } = require("../services/basketService.js");
const {basketIdValidator, productValidator} =require('../services/validatorService');
/**
 * Creates a new basket to start saving products
 */
const createBasket = async (req, res) => {
  const basket = await addBasket();
  res.json(basket);
};

/**
 * Add a new product to basket
 */
const addProduct = async (req, res) => {
  const { code, quantity } = req.body;
  const basketId = req.params.basketId;
  const validation = productValidator.validate({
    basketId, 
    code, 
    quantity
  });
  if(!validation.error){
    const result = await addProductToBasket(basketId, code, quantity);
    res.json(result);
  } else {
    res.json({
      success:false, 
      error: validation.error.details[0].message
    });
  }
};

/**
 * Gets the details for a given basket id
 * also calculates on the fly the promotion for included products
 */
const getBasketDetails = async (req, res) => {
  const basketId = req.params.basketId;
  const validation = basketIdValidator.validate(basketId);
  if(!validation.error){
    const result = await getDetails(basketId);
    res.json({
      success:true, 
      data: result
    });
  } else {
    res.json({
      success:false, 
      error: validation.error.details[0].message
    });
  }
};

/**
 * Makes a soft delete to a given basket
 */
const deleteBasket = async (req, res) => {
  const basketId = req.params.basketId;
  const validation = basketIdValidator.validate(basketId);
  if(!validation.error){
    const found = await deleteBasketById(basketId);
    let message = found ? 'Basket deleted successfully': 'Basket not found';
    res.json({
      success:found, 
      message
    });
  } else {
    res.json({
      success:false, 
      error: validation.error.details[0].message
    });
  }
};

module.exports = { createBasket, addProduct, getBasketDetails, deleteBasket };
