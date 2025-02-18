'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // Définir l'association Many-to-Many avec ingredient
      Recipe.belongsToMany(models.Ingredient, {
        through: 'RecipeIngredient', // Table de jointure
        as: 'ingredients', // Nom de l'association
        foreignKey: 'recipeId' // Clé étrangère dans la table de jointure
      });

      Recipe.belongsToMany(models.Category, {
        through:  'RecipeCategory',
        as: 'categories',
        foreignKey: 'recipeId',
      });

      Recipe.hasMany(models.Instruction, { 
        as: 'instructions', 
        foreignKey: 'recipeId' }
      );  
    }
  }

  // Définir le modèle recipe
  Recipe.init({
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Clé primaire
      autoIncrement: true, // Auto-incrémentation
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false // Le nom est obligatoire
    },
    image: {
      type: DataTypes.TEXT, 
      allowNull: false, 
    },
    description:DataTypes.TEXT,
    preparationTime: DataTypes.INTEGER,
    cookingTime: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
  });

  return Recipe;
};
