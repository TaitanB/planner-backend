const Todo = require("../../models/todo");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
// const { getQueryParameters, formatDate } = require("../../helpers");

const getPriority = async (req, res) => {
  const { priority } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  //   const queryParameters = getQueryParameters(req.query);

  const total = await Todo.countDocuments({
    ...req.query,
    _id: { $in: priority },
  });

  const totalPages = Math.ceil(total / perPage);

  const priorityTodos = await Todo.find(
    { ...req.query, _id: { $in: priority } },
    "-name -type -comments -updatedAt",
    { skip, limit }
  ).sort({ createdAt: -1 });

  //   const formattedResult = priorityTodos.map((notice) => ({
  //     ...notice._doc,
  //     date: formatDate(notice.date),
  //   }));

  res.status(200).json({ page, perPage, totalPages, todos: priorityTodos });
};

module.exports = {
  getPriority: ctrlWrapper(getPriority),
};
