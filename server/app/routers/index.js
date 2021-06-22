const express = require("express");
const mainRouter = express.Router();
const basketRouter = require("./baskets");
const productsRouter = require('./products');

mainRouter.use("/baskets", basketRouter);

mainRouter.use("/products", productsRouter);

module.exports = mainRouter;
