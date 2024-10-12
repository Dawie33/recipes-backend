const { Instruction } = require('../../models');
const getAll = async () => {
  return await Instruction.findAndCountAll();  
};

const create = async (instructionData) => {
  return await Instruction.create(instructionData);
};
const update = async (id, instructionData) => {
  return await Instruction.update(instructionData, {
    where: { id },
    returning: true, 
  });
};

const remove = async (id) => {
  return await Instruction.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
