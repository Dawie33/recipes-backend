const sequelize = require('../../../config/sequelize');
const { Recipe, Ingredient, Instruction, Image, RecipeIngredient, RecipeImage, Category, RecipeCategory } = require('../../../models');

const add = async (recipeData) => {
  const transaction = await sequelize.transaction();
  try {
    // Création de la recette
    const newRecipe = await Recipe.create({
      name: recipeData.name,
      description: recipeData.description,
      cookingTime: recipeData.cookingTime,
      preparationTime: recipeData.preparationTime,
    }, { transaction });

    // Ajout des ingrédients
    for (let ingredient of recipeData.ingredients) {
      let [ingredientRecord] = await Ingredient.findOrCreate({
        where: { name: ingredient.name },
        defaults: { name: ingredient.name },
        transaction
      });
      // Utilisation de newRecipe.recipeId et ingredientRecord.ingredientId
      await RecipeIngredient.create({
        recipeId: newRecipe.recipeId,  // Utilisation de newRecipe.recipeId
        ingredientId: ingredientRecord.ingredientId,  // Utilisation de ingredientRecord.ingredientId
        quantity: ingredient.quantity
      }, { transaction });
    }

    // Ajout des instructions
    for (let instruction of recipeData.instructions) {
      await Instruction.create({
        recipeId: newRecipe.recipeId, // Utilisation de newRecipe.recipeId
        step: instruction.step,
        description: instruction.description
      }, { transaction });
    }

    // Ajout de la catégorie
    if (recipeData.category) {
      let [categoryRecord] = await Category.findOrCreate({
        where: { name: recipeData.category.name },
        defaults: { name: recipeData.category.name },
        transaction
      });
      await RecipeCategory.create({
        recipeId: newRecipe.recipeId,  // Utilisation de newRecipe.recipeId
        categoryId: categoryRecord.categoryId // Utilisation de categoryRecord.categoryId
      }, { transaction });
    }

    // Ajout de l'image
    if (recipeData.image) {
      const image = await Image.create({
        url: recipeData.image.url,
        description: recipeData.image.description
      }, { transaction });

      await RecipeImage.create({
        recipeId: newRecipe.recipeId,  // Utilisation de newRecipe.recipeId
        imageId: image.imageId  // Utilisation de image.imageId
      }, { transaction });
    }

    await transaction.commit();
    return newRecipe;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = add;
