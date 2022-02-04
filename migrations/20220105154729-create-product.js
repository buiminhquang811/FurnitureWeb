'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tagsId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: false,
      },
      saleOffPrice: {
        type: Sequelize.DECIMAL(15,2),
      },
      producerId: {
        type: Sequelize.INTEGER
      },
      thumbnailImg: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productImg1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productImg2: {
        type: Sequelize.STRING
      },
      productImg3: {
        type: Sequelize.STRING
      },
      productImg4: {
        type: Sequelize.STRING
      },
      isFeaturedProduct: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      createdBy: {
        type: Sequelize.STRING
      },
      updatedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};