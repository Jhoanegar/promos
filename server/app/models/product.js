const { DataTypes } = require('sequelize')
const postgresConn = require('../../database/connections/postgres');

const Product = postgresConn.define(
  'Product',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(),
      allowNull: false
    }
  },
  {
    modelName: "Product",
    sequelize: postgresConn,
  }
);

module.exports = Product;
