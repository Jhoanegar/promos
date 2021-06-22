/**
 * Seeder to initialize Product table
 */
const { v4 } = require("uuid");
const ProductModel = require("../../app/models/product");
const PromoModel = require("../../app/models/promotion");

const products = [
  { code: "PEN", name: "Pen", price: 5, promoFunction: "promo2x1" },
  { code: "TSHIRT", name: "T-Shirt", price: 20, promoFunction: "promo3plus" },
  { code: "MUG", name: "Coffee Mug", price: 7.5, promoFunction: "" },
];

const insertProducts = async () => {
  await products.forEach(async ({ code, name, price, promoFunction }) => {
    const id = v4();
    try {
      await ProductModel.create({ id, code, name, price });
      if (promoFunction && promoFunction !== "") {
        await insertPromo(id, promoFunction);
      }
    } catch (error) {
      console.log(error.message);
    }
  });
};

const insertPromo = async (productId, calcFunction) => {
  const starts = new Date();
  const ends = new Date();
  ends.setMonth(starts.getMonth() + 1); // Promotion lasts 1 month starting now
  const id = v4();
  try {
    await PromoModel.create({ id, productId, calcFunction, starts, ends });
  } catch (error) {
    console.log(error.getDate);
  }
};

module.exports = insertProducts;
