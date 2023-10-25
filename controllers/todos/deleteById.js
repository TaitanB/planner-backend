const Todo = require("../../models/todo");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const deleteById = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;

  const result = await Todo.findOneAndRemove({
    $and: [{ _id: todoId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Todo not found");
  }

  res.json({
    message: "Todo deleted",
    deletedTodoId: todoId,
  });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
