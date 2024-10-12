// use-cases/recipes.js

const recipeDAO = require('../data-access/recipes');

const getAll = async () => {
    return await recipeDAO.getAll();
};

const getById = async (id) => {
    return await recipeDAO.getById(id);
};

const create = async (recipeData) => {
    return await recipeDAO.create(recipeData);
};

const update = async (id, recipeData) => {
    return await recipeDAO.update(id, recipeData);
};

const remove = async (id) => {
    return await recipeDAO.delete(id);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
