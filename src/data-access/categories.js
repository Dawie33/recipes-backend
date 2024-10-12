const { Category } = require('../../models');
const getAll= async () => {
  return await Category.findAndCountAll();  
};

const create = async (categoryData) => {
  return await Category.create(categoryData);
};
const update = async (id, categoryData) => {
  return await Category.update(categoryData, {
    where: { id },
    returning: true, 
  });
};

const remove = async (id) => {
  return await Category.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
