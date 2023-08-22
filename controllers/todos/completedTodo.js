const Todo = require("../../models/todo");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const completedTodo = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;

  const todoToUpdate = await Todo.findOne({ _id: todoId, owner });

  if (!todoToUpdate) {
    throw HttpError(404, "Todo not found");
  }

  if (todoToUpdate.completedDate === null) {
    todoToUpdate.completedDate = new Date();
  } else {
    todoToUpdate.completedDate = null;
  }

  await todoToUpdate.save();

  res.json(todoToUpdate);
};

module.exports = {
  completedTodo: ctrlWrapper(completedTodo),
};
