'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipe_images', {
      recipeId: {
        type: Sequelize.INTEGER
      },
      imageId: {
        type: Sequelize.INTEGER
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('recipe_images');
  }
};
