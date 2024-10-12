// data-access/recipeDAO.js

const { Recipe } = require('../../models');

const RecipesDAO = {
  // Récupérer toutes les recettes avec possibilité de pagination
  getAll: async (offset = 0, limit = 10) => {
    return await Recipe.findAndCountAll({
      offset,
      limit,
    });
  },

  // Récupérer une recette par ID
  getById: async (id) => {
    return await Recipe.findByPk(id);
  },

  // Créer une nouvelle recette
  create: async (recipeData) => {
    return await Recipe.create(recipeData);
  },

  // Mettre à jour une recette par ID
  update: async (id, recipeData) => {
    const [updated] = await Recipe.update(recipeData, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return await Recipe.findByPk(id);
    }
    throw new Error('Recipe not found');
  },

  // Supprimer une recette par ID
  delete: async (id) => {
    const deleted = await Recipe.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Recipe deleted successfully' };
    }
    throw new Error('Recipe not found');
  }
};

module.exports = RecipesDAO;
