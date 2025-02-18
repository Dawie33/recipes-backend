const sequelize = require('../../../config/sequelize');
const { Recipe, Ingredient, Instruction, RecipeIngredient, Category, RecipeCategory } = require('../../../models');


const add = async (data,mainImage,ingredientImages) => {
  const transaction = await sequelize.transaction();
  try {
    // Création de la recette
    const encodedMainImage = mainImage.buffer.toString('base64');
    const newRecipe = await Recipe.create({
      name: data.name,
      description: data.description,
      cookingTime: data.cookingTime,
      preparationTime: data.preparationTime,
      image : encodedMainImage || null
    }, { transaction });

   // Ajout des ingrédients
    for (let i = 0; i < data.ingredients.length; i++) {
      const ingredient = data.ingredients[i]; // Récupérer l'ingrédient à l'index courant

      // Trouver l'image associée à cet ingrédient
      const ingredientImage = ingredientImages.find((file) => {
        const match = file.fieldname.match(/ingredients\[(\d+)\]\[image\]/); // Extraire l'index
        return match && parseInt(match[1], 10) === i; // Vérifier que l'index correspond
      });

      // Associer l'image à l'ingrédient
      if (ingredientImage) {
        ingredient.image = ingredientImage.buffer.toString('base64');
      }

      // Trouver ou créer l'ingrédient
      let [ingredientRecord] = await Ingredient.findOrCreate({
        where: { name: ingredient.name },
        defaults: { 
          name: ingredient.name,
          image: ingredient.image || null, // Associer l'image si présente
          unit: ingredient.unit || null,   
        },
        transaction,
      });

      // Associer l'ingrédient à la recette
      await RecipeIngredient.create({
        recipeId: newRecipe.recipeId,  // Utilisation de newRecipe.recipeId
        ingredientId: ingredientRecord.ingredientId,  // Utilisation de ingredientRecord.ingredientId
        quantity: ingredient.quantity,
      }, { transaction });
    }


    // Ajout des instructions
    for (let instruction of data.instructions) {
      await Instruction.create({
        recipeId: newRecipe.recipeId, // Utilisation de newRecipe.recipeId
        step: instruction.step,
        description: instruction.description
      }, { transaction });
    }

    // Ajout de la catégorie
    if (data.category) {
      let [categoryRecord] = await Category.findOrCreate({
        where: { name: data.category },
        defaults: { name: data.category },
        transaction
      });
      await RecipeCategory.create({
        recipeId: newRecipe.recipeId,  // Utilisation de newRecipe.recipeId
        categoryId: categoryRecord.categoryId // Utilisation de categoryRecord.categoryId
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
