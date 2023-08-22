const Todo = require("../../models/todo");
const { ctrlWrapper } = require("../../decorators");

const getAll = async (req, res) => {
  const perPage = 10;
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const total = await Todo.countDocuments(owner);

  const totalPages = Math.ceil(total / perPage);

  let todos = await Todo.find({ owner }, "", {
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

  res.status(200).json({ page, perPage, totalPages, todos });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
