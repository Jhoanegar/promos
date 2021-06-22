require('dotenv').config();
const sequelize = require('../connections/postgres');
const insertProducts = require('../seeders/seedInitialData');
const { errorLogger } = require("../../app/services/loggingService");

// Just added references to create tables
const {Product, Basket, BasketProduct} = require('../../app/models/index');

const createSchema = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await insertProducts();
  } catch (error) {
    errorLogger.error({
      error: error.message,
      date: new Date(),
    });
  }
};



createSchema();
