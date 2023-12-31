const Todo = require("../../models/todo");
const { ctrlWrapper } = require("../../decorators");
const { perPage, StatusEnum } = require("../../constants/constants");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage, query, status } = req.query;
  const skip = (page - 1) * limit;

  let queryParametrs = { owner };

  if (query) {
    const regexQuery = { $regex: query, $options: "i" };
    queryParametrs = {
      ...queryParametrs,
      $or: [{ description: regexQuery }, { title: regexQuery }],
    };
  }

  if (status === StatusEnum.COMPLETED) {
    queryParametrs.completedDate = { $ne: null };
  } else if (status === StatusEnum.OVERDUE) {
    queryParametrs.overdueDate = { $ne: null };
  } else if (status === StatusEnum.ARCHIVED) {
    queryParametrs.archivedDate = { $ne: null };
  }

  const total = await Todo.countDocuments(queryParametrs);

  const totalPages = Math.ceil(total / perPage);

  let todos = await Todo.find(queryParametrs, "", {
    skip,
    limit,
  }).sort({ updatedAt: -1 });

  todos = await Promise.all(
    todos.map(async (todo) => {
      if (todo.overdueDate === null && todo.completedDate === null) {
        if (todo.plannedDate < new Date()) {
          todo.overdueDate = new Date();
        }
        await todo.save();
      }

      return todo;
    })
  );

  res.status(200).json({ page, perPage, totalPages, total, todos });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
