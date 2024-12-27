const sequelize = require('../../../config/sequelize');
const { Recipe, Ingredient, Instruction, Image, RecipeIngredient, RecipeImage, Category, RecipeCategory } = require('../../../models');
const fs = require('fs');
const path = require('path');

const add = async (data,image) => {
  const transaction = await sequelize.transaction();
  try {
    // Création de la recette
    const newRecipe = await Recipe.create({
      name: data.name,
      description: data.description,
      cookingTime: data.cookingTime,
      preparationTime: data.preparationTime,
    }, { transaction });

    // Ajout des ingrédients
    for (let ingredient of data.ingredients) {
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

    // Ajout de l'image
    if (image) {
      // Chemin absolu vers le dossier 'uploads' à la racine du projet
      const uploadsDir = path.join(__dirname, 'uploads');

      // Créez le dossier 'uploads' s'il n'existe pas
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }      
      const filePath = path.join(uploadsDir, image.originalname);

      fs.writeFileSync(filePath, image.buffer);

    
      // Ensuite, enregistrez l'URL ou le chemin du fichier dans la base de données
      const imageRecord = await Image.create(
        {
          url: `/uploads/${image.originalname}`, // Utilisez l'URL ou le chemin du fichier
          description: image.description || 'No description', // Ajoutez une description si nécessaire
        },
        { transaction }
      );
    
      await RecipeImage.create(
        {
          recipeId: newRecipe.recipeId,
          imageId: imageRecord.imageId,
        },
        { transaction }
      );
    }
    

    await transaction.commit();
    return newRecipe;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = add;
