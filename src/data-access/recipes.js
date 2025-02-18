// data-access/recipeDAO.js

const { Recipe, Ingredient, Instruction, Category } = require('../../models');

const RecipesDAO = {
  // Récupérer toutes les recettes avec possibilité de pagination
  getAll: async (offset = 0, limit = 10) => {
    let recipes = await Recipe.findAll({offset,limit})
    const response = recipes.map(recipe => recipe.toJSON());
    return response
  },

  getOne: async (recipeId) => {
    try {
       let recipe = await Recipe.findByPk(recipeId, {
      include: [
        {
          model: Instruction,
          as: 'instructions', 
          attributes: ['step', 'description'], 
        },
        {
          model: Category,
          as: 'categories', 
          attributes: ['name'],
        },
        {
          model: Ingredient,
          as: 'ingredients', 
          through: { attributes: ['quantity'] }, 
          attributes: ['name','unit','image'],
        },
     
      ],
    });
  
    const response = recipe.toJSON();

    return response
   
    } catch (error) {
      throw new Error('Recipe not found: ' + error.message);
    }
   
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
