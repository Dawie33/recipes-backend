const recipeDAO = require('../../data-access/recipes');

const getById = async (id) => {
  return await recipeDAO.getOne(id);
};

module.exports = getById;
