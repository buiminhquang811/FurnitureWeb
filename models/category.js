'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category}) {
      // define association here
      this.hasOne(Category, {foreignKey: "parentId"});
    }
  };
  Category.init({
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
    parentId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    featuredImage: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};