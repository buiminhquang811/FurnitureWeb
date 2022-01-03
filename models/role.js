'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.hasMany(User, {foreignKey: 'roleId', as: "roles"})
    }
  };
  Role.init({
    role: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Role',
  });
  return Role;
};