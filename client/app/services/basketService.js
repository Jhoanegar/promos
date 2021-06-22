const axios = require("axios");
const remotePort = process.env.REMOTE_PORT;
const remoteHost = `http://localhost:${remotePort}`;
const { errorLogger } = require("./loggingService");

/**
 * Creates a new basket
 */
const addBasket = async () => {
  try {
    const response = await axios.post(`${remoteHost}/baskets`);
    return response.data;
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return { success: false };
  }
};

/**
 * Adds a new product to a given basket
 */
const addProductToBasket = async (basketId, code, quantity) => {
  try {
    const response = await axios.post(
      `${remoteHost}/baskets/${basketId}/product`,
      {
        code,
        quantity,
      }
    );
    return response.data;
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return { success: false };
  }
};

/**
 * Gets the details for a given basket id
 * also calculates on the fly the promotion for included products
 */
const getDetails = async (basketId) => {
  try {
    const response = await axios.get(`${remoteHost}/baskets/${basketId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return { success: false };
  }
};

const deleteBasketById = async (basketId) => {
  try {
    const response = await axios.delete(`${remoteHost}/baskets/${basketId}`);
    return response.data;
  } catch (error) {
    errorLogger.error({
      error: error.message,
      stack: error.stack,
      date: new Date(),
    });
    return { success: false };
  }
};

module.exports = {
  addBasket,
  addProductToBasket,
  getDetails,
  deleteBasketById,
};
