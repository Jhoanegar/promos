const postgresConn = require('../../database/connections/postgres');
const { DataTypes, BIGINT } = require('sequelize')

const Basket = postgresConn.define(
  'Basket',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    modelName:'Basket',
    sequelize: postgresConn
  }
);

module.exports = Basket;
