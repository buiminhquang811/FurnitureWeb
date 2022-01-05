'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    code: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Mã sản phẩm không được để trống");
          }
        },
      },
    },
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
    categoryId: {
      type: DataTypes.INTEGER,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Loại danh mục không được để trống");
          }
        },
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Số lượng không được để trống");
          }
        },
      },
    },
    tagsId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(15,2),
    saleOffPrice: DataTypes.DECIMAL(15,2),
    producerId: DataTypes.INTEGER,
    thumbnailImg: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Ảnh sản phẩm không được để trống");
          }
        },
      },
    },
    productImg1: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value) {
            return true;
          } else {
            throw new Error("Ảnh sản phẩm không được để trống");
          }
        },
      },
    },
    productImg2: DataTypes.STRING,
    productImg3: DataTypes.STRING,
    productImg4: DataTypes.STRING,
    isFeaturedProduct: DataTypes.INTEGER,
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};