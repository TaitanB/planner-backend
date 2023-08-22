const Todo = require("../../models/todo");

const { ctrlWrapper } = require("../../decorators");

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Todo.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = {
  add: ctrlWrapper(add),
};
