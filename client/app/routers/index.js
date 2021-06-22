const express = require("express");
const { createBasket, addProduct, getBasketDetails, deleteBasket } = require("../controllers/basketController");

const basketRouter = express.Router();

// New Basket
basketRouter.post("/", createBasket);

// Add Product
basketRouter.post("/:basketId/product", addProduct);

// Show basket details
basketRouter.get("/:basketId", getBasketDetails);

// Delete basket
basketRouter.delete("/:basketId", deleteBasket);

module.exports = basketRouter;
