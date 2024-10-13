// models/recipe_ingredient.js
module.exports = (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define('RecipeIngredient', {
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,  // Clé primaire
        references: {
          model: 'Recipe',
          key: 'recipeId'
        }
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,  // Clé primaire
        references: {
          model: 'Ingredient',
          key: 'ingredientId'
        }
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'recipe_ingredients',  // Spécifiez le nom exact de la table
      timestamps: false,  // Désactivation de createdAt et updatedAt
    });
  
    return RecipeIngredient;
  };
  