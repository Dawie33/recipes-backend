const recipeDAO = require('../../data-access/recipes');

const list = async () => {
  return await recipeDAO.getAll();
};

module.exports = list;
