'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('images', 'url');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('images', 'url', {
      type: Sequelize.STRING,
      allowNull: true, // Facultatif si jamais vous devez revenir en arrière
    });
  },
};
