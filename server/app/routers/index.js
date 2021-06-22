const express = require("express");
const mainRouter = express.Router();
const basketRouter = require("./baskets");

mainRouter.use("/baskets", basketRouter);

module.exports = mainRouter;
