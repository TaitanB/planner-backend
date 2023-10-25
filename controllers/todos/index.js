const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { getAll } = require("./getAll");
const { updateById } = require("./updateById");
const { completedTodo } = require("./completedTodo");
const { togglePriority } = require("./togglePriority");
const { getPriority } = require("./getPriority");
const { archivedTodo } = require("./archivedTodo");

module.exports = {
  add,
  deleteById,
  getAll,
  updateById,
  completedTodo,
  togglePriority,
  getPriority,
  archivedTodo,
};
