const recipeDAO = require('../../data-access/recipes');

const remove = async (id) => {
  return await recipeDAO.delete(id);
};

module.exports = remove;
