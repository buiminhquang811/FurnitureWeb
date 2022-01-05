'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Producer.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Tên không được để trống");
          }
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Địa chỉ không được để trống");
          }
        },
      },
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Đường dẫn không được để trống");
          }
        },
      },
    },
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producer',
  });
  return Producer;
};