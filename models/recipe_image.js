// models/recipe_image.js
module.exports = (sequelize, DataTypes) => {
    const RecipeImage = sequelize.define('RecipeImage', {
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,  // Clé primaire
        references: {
          model: 'Recipe',
          key: 'id'
        }
      },
      imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Clé primaire
        allowNull: false,
        references: {
          model: 'Image',
          key: 'id'
        }
      }
    }, {
      tableName: 'recipe_images',
      timestamps: false,
    });
  
    return RecipeImage;
  };
  