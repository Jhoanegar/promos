require('dotenv').config();
const sequelize = require('../connections/postgres');
const insertProducts = require('../seeders/seedInitialData');
const { errorLogger } = require("../../app/services/loggingService");

// Just added references to create tables
const {Product, Basket, BasketProduct} = require('../../app/models/index');

/**
 * Leaving a `sync(force: true)` call is very dangerous. This code should be
 * switched depending on NODE_ENV to avoid overwriting a PROD database.
 * Also, insertProducts could've been a set of migration files doing one specific
 * job each.
 */
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
