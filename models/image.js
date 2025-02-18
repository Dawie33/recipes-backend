'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsToMany(models.Recipe, {
        through: 'RecipeImage',
        foreignKey: 'imageId',
        otherKey: 'recipeId',
        as: 'recipes', // Alias pour accéder aux recettes d'une image
      });
    }
  }

  Image.init(
    {
      imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      image: {
        type: DataTypes.BLOB('long'), 
        allowNull: true, 
      },
    },
    {
      sequelize,
      tableName: 'images',
      modelName: 'Image',
    }
  );

  return Image;
};
