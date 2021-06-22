const { v4 } = require("uuid");
const {
  Basket,
  Product,
  BasketProduct,
  Promotion,
} = require("../models/index");
const { errorLogger } = require("./loggingService");

// These functions are called by using eval()
const { promo2x1, promo3plus } = require("./promoService");

/**
 * Creates a new basket
 */
const addBasket = async () => {
  try {
    const basket = await Basket.create({ id: v4(), enabled: true });
    return {
      success: true,
      basket,
    };
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return {
      success: false,
    };
  }
};

/**
 * Adds a new product to a given basket
 */
const addBasketProduct = async (basketId, productCode, quantity) => {
  try {
    const basket = await Basket.findOne({
      where: { id: basketId, enabled: true },
    });
    if (basket) {
      const product = await Product.findOne({
        where: { code: productCode },
      });

      await upsertBasketProduct(basketId, product.id, quantity);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return false;
  }
};

/**
 * Gets the details for a given basket id
 * also calculates on the fly the promotion for included products
 */
const getDetails = async (basketId) => {
  try {
    // Eager loading to tet Basket, Basket Products, Products At the same time
    const basket = await Basket.findOne({
      where: { id: basketId, enabled: true },
      include: [
        {
          model: BasketProduct,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Promotion,
                },
              ],
            },
          ],
        },
      ],
    });
    let flatResults = [];
    let totalSum = 0;

    if (basket) {
      flatResults = basket.BasketProducts.map((basketProduct) => {
        let total, hasPromo;
        if (basketProduct.Product.Promotion) {
          hasPromo = true;
          total = calculatePromotion(
            basketProduct.quantity,
            basketProduct.Product.price,
            basketProduct.Product.Promotion
          );
        } else {
          hasPromo = false;
          total = basketProduct.Product.price * basketProduct.quantity;
        }
        totalSum += total;
        return {
          code: basketProduct.Product.code,
          name: basketProduct.Product.name,
          quantity: basketProduct.quantity,
          unitPrice: basketProduct.Product.price,
          hasPromo,
          total: total,
        };
      });
    }

    return {
      success: true,
      total: totalSum,
      details: flatResults,
    };
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });

    return { success: false };
  }
};

// Disables given basket Id
const disableBasket = async (basketId) => {
  const whereClause = {
    where: {
      id: basketId,
      enabled: true,
    },
  };
  try {
    const basket = await Basket.findOne(whereClause);
    if (basket) {
      await Basket.update({ enabled: false }, whereClause);
      return true;
    }
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return false;
  }
};

/**
 * Updates or inserts a product in the basket
 */
const upsertBasketProduct = async (basketId, productId, quantity) => {
  const basketProduct = await BasketProduct.findOne({
    where: {
      basketId: basketId,
      productId: productId,
    },
  });

  if (basketProduct) {
    basketProduct.quantity += quantity;
    await BasketProduct.update(
      { quantity: basketProduct.quantity },
      {
        where: {
          basketId: basketId,
          productId: productId,
        },
      }
    );
  } else {
    await BasketProduct.create({
      basketId,
      productId,
      quantity,
    });
  }
};

/**
 * Calculates the price according to a given dynamic function
 */
const calculatePromotion = (quantity, unitPrice, promotion) => {
  const today = Date.now();
  const starts = Date.parse(promotion.starts);
  const ends = Date.parse(promotion.ends);

  if (starts <= today && today <= ends) {
    const calcFunction = `${promotion.calcFunction}(${quantity}, ${unitPrice})`;
    return eval(calcFunction);
  }

  return quantity * unitPrice;
};

module.exports = {
  addBasket,
  addBasketProduct,
  getDetails,
  disableBasket,
};
