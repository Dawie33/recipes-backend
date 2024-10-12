'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instruction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Instruction.belongsTo(models.Recipe, {
          foreignKey: 'recipeId',
          as: 'recipe',
        });
      }
    }
  
  Instruction.init({
    instructionId:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipeId: DataTypes.INTEGER,
    step: DataTypes.INTEGER,
    description: DataTypes.STRING,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Instruction',
    tableName: 'instructions'
  });
  return Instruction;
};