require("dotenv").config();

const {
  addBasket,
  addBasketProduct,
  getDetails,
  disableBasket
} = require("../app/services/basketService");

let basket;

describe("BasketService", () => {
  test("Should create a basket", async () => {
    basket = await addBasket();
    expect(basket.success).toBe(true);
  });

  test("Should validate required Product Code", async () => {
    const product = { quantity: 10 };
    let result = await addBasketProduct(
      basket.basket.id,
      product.code,
      product.quantity
    );
    expect(result).toBe(false);
  });

  test("Should validate required Quantity", async () => {
    const product = { code: "PEN" };
    const result = await addBasketProduct(
      basket.basket.id,
      product.code,
      product.quantity
    );
    expect(result).toBe(false);
  });

  test("Sould insert Product when data is complete", async () => {
    const product = { code: "PEN", quantity: 7 };
    const result = await addBasketProduct( basket.basket.id, product.code, product.quantity );
    expect(result).toBe(true);
  });

  test('Should calculate promos regarding to NodeJSExercise P1', async () => {
    const pen = { code: "PEN", quantity: 1 };
    const tShirt = { code: "TSHIRT", quantity: 1 };
    const mug = { code: "MUG", quantity: 1 };
    const newBasket = await addBasket();
    await addBasketProduct(newBasket.basket.id, pen.code, pen.quantity);
    await addBasketProduct(newBasket.basket.id, tShirt.code, tShirt.quantity);
    await addBasketProduct(newBasket.basket.id, mug.code, mug.quantity);
    const result = await getDetails(newBasket.basket.id);
    expect(result.total).toBe(32.5);
  });
  
  test('Should calculate promos regarding to NodeJSExercise P2', async () => {
    const pen = { code: "PEN", quantity: 2 };
    const tShirt = { code: "TSHIRT", quantity: 1 };
    const newBasket = await addBasket();
    await addBasketProduct(newBasket.basket.id, pen.code, pen.quantity);
    await addBasketProduct(newBasket.basket.id, tShirt.code, tShirt.quantity);
    const result = await getDetails(newBasket.basket.id);
    expect(result.total).toBe(25);
  });
  
  test('Should calculate promos regarding to NodeJSExercise P3', async () => {
    const pen = { code: "PEN", quantity: 1 };
    const tShirt = { code: "TSHIRT", quantity: 4 };
    const newBasket = await addBasket();
    await addBasketProduct(newBasket.basket.id, pen.code, pen.quantity);
    await addBasketProduct(newBasket.basket.id, tShirt.code, tShirt.quantity);
    const result = await getDetails(newBasket.basket.id);
    expect(result.total).toBe(65);
  });
  
  test('Should calculate promos regarding to NodeJSExercise P4', async () => {
    const pen = { code: "PEN", quantity: 3 };
    const tShirt = { code: "TSHIRT", quantity: 3 };
    const mug = { code: "MUG", quantity: 1 };
    const newBasket = await addBasket();
    await addBasketProduct(newBasket.basket.id, pen.code, pen.quantity);
    await addBasketProduct(newBasket.basket.id, tShirt.code, tShirt.quantity);
    await addBasketProduct(newBasket.basket.id, mug.code, mug.quantity);
    const result = await getDetails(newBasket.basket.id);
    expect(result.total).toBe(62.5);
  });
  
  test("Should validate required basketId when getting Basket details", async () => {
    const result = await getDetails("");
    expect(result.success).toBe(false);
  });

  test("Should validate required basketId when deleting a basket", async () => {
    const result = await disableBasket("");
    expect(result).toBe(false);
  });
  
  /*test("Should validate basketId wheren deleting a Basket", () => {});
  test("Should allow to delete same basket twice", () => {});
  test("Shouldn't allow to get details for a deleted basket", () => {});*/
});

/*
`
Should calculate 3plus promo only for TSHIRT products
Should calculate total minus discounts when having PEN or TSHIRT products
Should validate Product Input
Should validate basketId when getting Basket details
Should validate basketId wheren deleting a Basket
Should allow to delete same basket twice
Should'n allow to get details for a deleted basket
`
*/
