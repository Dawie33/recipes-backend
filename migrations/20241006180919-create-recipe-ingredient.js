'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_ingredients', {
      recipeId: {
        type: Sequelize.INTEGER
      },
      ingredientId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('recipe_ingredients');
  }
};