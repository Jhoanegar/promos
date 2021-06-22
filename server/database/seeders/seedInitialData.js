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
  /**
   * ATTENTION! This code is NOT asynchronouns, Array.forEach returns undefined
   * await'ing on undefined will accomplish nothing. 
   * This is a common mistake while transitioning from Promise.then to async await
   * You have several options, among them:
   * 1: Use for..of when the order of the promises matters
   * ```js
   * for (const product of products) {
   *    await asyncCode(product);
   * }
   * ```
   * 2: Use a map to generate the promises and await that when the order of the promises
   * does not matter (usually faster because of parallel execution)
   * ```js
   * const promises = products.map(<the exact same code you have>)
   * 
   * await Promise.all(promises)
   * ```
   * 3: Use reduce if the result of the new promise depends on one or more of the previous ones
   * or if you need to generate one accumulator value.
   * ```js
   * const insertedProducts = await products.reduce(async (previousPromise, product) => {
   *  const newValue = await someAsyncOperation(product);
   *   
   *  return [...(await previousPromise), newValue]
   * 
   * }, [])
   * ```
   * 
   * It's a happy accident that this code works as intended but you should fix it :)
   */
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
