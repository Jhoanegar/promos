const express = require("express");
const router = express.Router();

// Add product to basket
router.post("/", (req, res) => {
  res.send("inserting products");
});

// Get the list of products
router.get("/", (req, res) => {
  res.send("getting products");
});

module.exports = router;
