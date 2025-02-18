'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Définir l'association Many-to-Many avec le modèle Recipe
      Ingredient.belongsToMany(models.Recipe, {
        through: {
          model: 'RecipeIngredient',
          unique: false,
        },
        as: 'recipe', // Nom de l'association
        foreignKey: 'ingredientId'
      });
    }
  }

  // Définition du modèle Ingredient avec les colonnes
  Ingredient.init({
    ingredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    unit: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT, 
      allowNull: false, 
    },
  }, {
    sequelize,
    modelName: 'Ingredient',
     tableName: 'ingredients',
  });

  return Ingredient;
};
