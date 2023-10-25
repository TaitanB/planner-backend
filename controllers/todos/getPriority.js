const Todo = require("../../models/todo");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");

const getPriority = async (req, res) => {
  const { priority } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const total = await Todo.countDocuments({
    ...req.query,
    _id: { $in: priority },
  });

  const totalPages = Math.ceil(total / perPage);
  console.log(page);
  const priorityTodos = await Todo.find(
    { ...req.query, _id: { $in: priority } },
    "",
    { skip, limit }
  ).sort({ createdAt: -1 });

  res
    .status(200)
    .json({ page, perPage, totalPages, total, todos: priorityTodos });
};

module.exports = {
  getPriority: ctrlWrapper(getPriority),
};
