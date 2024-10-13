const { Recipe, Ingredient, Instruction, Image, Category } = require('../../../models');

const getRecipeWithDetails = async (recipeId) => {
  try {
    const recipe = await Recipe.findOne({
      where: { recipeId },  // Filtrer la recette par son `recipeId`
      include: [
        {
          model: Instruction,
          as: 'instructions',  // Alias des instructions
          attributes: ['step', 'description'],  // Colonnes à récupérer
        },
        {
          model: Category,
          as: 'categories',  // Alias de la catégorie
          attributes: ['name'],
        },
        {
          model: Ingredient,
          as: 'ingredients',  // Alias des ingrédients
          through: { attributes: ['quantity'] },  // Inclure la table intermédiaire pour obtenir la quantité
          attributes: ['name'],
        },
        {
          model: Image,
          as: 'images',  // Alias des images
          attributes: ['url', 'description'],  // Colonnes des images
          through: { attributes: [] },  // On ignore les colonnes de la table relationnelle `recipe_image`
        }
      ],
    });

    return recipe;
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette :', error);
    throw error;
  }
};

module.exports = getRecipeWithDetails