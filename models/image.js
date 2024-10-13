'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {   
      Image.belongsToMany(models.Recipe, {
        through: 'RecipeImage',
        foreignKey: 'imageId',
        otherKey: 'recipeId',
        as: 'recipes'  // Alias pour accéder aux recettes d'une image
      });
    }
  }

  Image.init({
    imageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false, // Ou nullable si tu stockes directement l'image dans la base de données
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Par exemple, une description de l'image (facultatif)
    },
  }, {
    sequelize,
    tableName: 'images',
    modelName: 'Image',
  });


  return Image;
};
