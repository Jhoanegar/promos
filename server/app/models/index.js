const Basket = require('./basket');
const BasketProduct = require('./basketProduct');
const Product = require('./product');
const Promotion = require('./promotion');

Basket.hasMany(BasketProduct, {foreignKey:'basketId'});
BasketProduct.belongsTo(Product, {foreignKey:'productId'});
Product.hasOne(Promotion, {foreignKey: 'productId'});

module.exports = {Product, Basket, BasketProduct, Promotion};