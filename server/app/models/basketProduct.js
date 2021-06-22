const postgresConn = require("../../database/connections/postgres");
const { DataTypes } = require("sequelize");

const BasketProduct = postgresConn.define(
  "BasketProduct",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    basketId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "BasketProduct",
    sequelize: postgresConn,
  }
);

module.exports = BasketProduct;
