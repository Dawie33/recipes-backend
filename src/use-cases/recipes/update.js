const recipeDAO = require('../../data-access/recipes');

const update = async (id, recipeData) => {
  return await recipeDAO.update(id, recipeData);
};

module.exports = update;
