const {
  addBasket,
  addBasketProduct,
  getDetails,
  disableBasket,
} = require("../services/basketService");
const {
  basketIdValidator,
  productValidator,
} = require("../services/validatorService");

/**
 * Creates a new basket to start saving products
 */
const createBasket = async (req, res) => {
  const result = await addBasket();
  /**
   * This is exactly why Exceptions exists. While I'm not 100% oppposed to this
   * style of handling errors, I see no way where this application is going to 
   * recover from an unexpected error. At the very least you are missing a try-catch
   * block around this entire handler. But again, catching/handling/re-throwing 
   * an exception is how I've seen this being approched the most.
   */
  if (result.success) {
    res.json({
      success: true,
      basketId: result.basket.id,
      message: "Basket saved successfully.",
    });
  } else {
    /**
     * So in this case we are returning a status code 200 for an unsuccessful
     * operation. That doesn't sound like good API design.
     * Exceptions should have 4XX or 5xx status codes with appropriate messages
     */
    res.json({
      success: false,
      error: "Basket could not be saved.",
    });
  }
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
    quantity,
  });
  if (!validation.error) {
    const success = await addBasketProduct(basketId, code, quantity);
    if (success) {
      res.json({
        success,
        message: "Product addedd sucessfully to basket",
      });
    } else {
      res.json({
        success,
        error: "Product couldn't be saved"
      })
    }
  } else {
    res.json({
      success: false,
      error: validation.error.details[0].message,
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
  if (!validation.error) {
    const result = await getDetails(basketId);
    if (result.success) {
      res.json({
        success: true,
        data: {
          total: result.total,
          details: result.details,
        },
      });
    } else {
      res.json({
        success: true,
        message: "Could not get data for the requested basket",
      });
    }
  } else {
    res.json({
      success: false,
      error: validation.error.details[0].message,
    });
  }
};

/**
 * Makes a soft delete to a given basket
 */
const deleteBasket = async (req, res) => {
  const basketId = req.params.basketId;
  const validation = basketIdValidator.validate(basketId);
  if (!validation.error) {
    const found = await disableBasket(basketId);
    let message = found ? "Basket deleted successfully" : "Basket not found";
    res.json({
      success: found,
      message,
    });
  } else {
    res.json({
      success: false,
      error: validation.error.details[0].message,
    });
  }
};

module.exports = { createBasket, addProduct, getBasketDetails, deleteBasket };
