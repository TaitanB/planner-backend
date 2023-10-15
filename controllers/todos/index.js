const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { getAll } = require("./getAll");
const { updateById } = require("./updateById");
const { completedTodo } = require("./completedTodo");
const { addPriority } = require("./addPriority");
const { deletePriority } = require("./deletePriority");
const { getPriority } = require("./getPriority");
const { archivedTodo } = require("./archivedTodo");

module.exports = {
  add,
  deleteById,
  getAll,
  updateById,
  completedTodo,
  addPriority,
  deletePriority,
  getPriority,
  archivedTodo,
};
