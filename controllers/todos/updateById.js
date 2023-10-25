const Todo = require("../../models/todo");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateById = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;
  const { description } = req.body;

  const todoToUpdate = await Todo.findOneAndUpdate(
    {
      $and: [{ _id: todoId, owner }],
    },
    { description },
    { new: true }
  );

  if (!todoToUpdate) {
    throw HttpError(404, "Todo not found");
  }

  await todoToUpdate.save();

  res.json(todoToUpdate);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};
