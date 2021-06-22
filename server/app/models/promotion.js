const postgresConn = require('../../database/connections/postgres');
const {DataTypes} = require('sequelize')

const Promotion = postgresConn.define(
  'Promotion',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    productId: {
      type:DataTypes.UUID,
      allowNull: false
    },
    calcFunction: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    starts: {
      type:DataTypes.DATEONLY,
      allowNull: false
    },
    ends: {
      type:DataTypes.DATEONLY,
      allowNull: false
    },
  }, 
  {
    modelName: 'Product',
    sequelize: postgresConn
  }
);

module.exports = Promotion;