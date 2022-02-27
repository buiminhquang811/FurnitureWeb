'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderProduct.init({
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id"
      }
    },
    orderId: {
      type:DataTypes.INTEGER,
      references: {
        model: "Order",
        key: "id"
      }
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(15,2),
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};