const Todo = require("../../models/todo");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const archivedTodo = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;

  const todoToUpdate = await Todo.findOne({ _id: todoId, owner });

  if (!todoToUpdate) {
    throw HttpError(404, "Todo not found");
  }

  if (todoToUpdate.archivedDate === null) {
    todoToUpdate.archivedDate = new Date();
  } else {
    todoToUpdate.archivedDate = null;
  }

  await todoToUpdate.save();

  res.json(todoToUpdate);
};

module.exports = {
  archivedTodo: ctrlWrapper(archivedTodo),
};
