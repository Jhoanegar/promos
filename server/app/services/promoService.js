/**
 * Calculates promotions 2x1
 * Examples:
 *    - Buy 6, charge 3
 *    - Buy 7, charge 4
 */
 const promo2x1 = (quantity, unitPrice) => {
  const unitsToCharge = Math.ceil(quantity / 2);
  return unitsToCharge * unitPrice;
};

/**
 * Calculates promotion when buying three o more
 * products
 */
const promo3plus = (quantity, unitPrice) => {
  const total = quantity * unitPrice;
  let discount = 0;
  if (quantity >= 3) discount = total * 0.25;
  return total - discount;
};

/**
 * What if we had 100s of promotions? Would this file keep getting bigger & bigger?
 * If I want to add a different set of parameters for the same promotion I would have
 * to deploy the entire application again and create new fn? This code _works_ but it's not reusable
 * or scalable in any way which are two of the core principles in NodeJS.
 * 
 */
module.exports = {promo2x1, promo3plus}
