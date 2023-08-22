const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { getAll } = require("./getAll");
const { updateById } = require("./updateById");
const { completedTodo } = require("./completedTodo");

module.exports = {
  add,
  deleteById,
  getAll,
  updateById,
  completedTodo,
};
