// models/recipe_category.js
module.exports = (sequelize, DataTypes) => {
    const RecipeCategory = sequelize.define('RecipeCategory', {
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,  // Clé primaire
        references: {
          model: 'Recipe',
          key: 'recipeId'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,  // Clé primaire
        references: {
          model: 'Category',
          key: 'categoryId'
        }
      }
    }, {
      tableName: 'recipe_categories',
      timestamps: false,
    });
  
    return RecipeCategory;
  };
  