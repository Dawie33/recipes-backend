'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_categories', {
      recipeId: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('recipe_categories');
  }
};