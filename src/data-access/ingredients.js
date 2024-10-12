const { Ingredient } = require('../../models');
const getAll = async () => {
  return await Ingredient.findAndCountAll();  
};

const create = async (ingredientData) => {
  return await Ingredient.create(ingredientData);
};
const update = async (id, ingredientData) => {
  return await Ingredient.update(ingredientData, {
    where: { id },
    returning: true, 
  });
};

const remove = async (id) => {
  return await Ingredient.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
