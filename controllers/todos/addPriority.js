const User = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");

const addPriority = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;
  //   console.log(todoId);
  const user = await User.findByIdAndUpdate(
    owner,
    { $addToSet: { priority: todoId } },
    { new: true }
  );

  res.status(201).json(user.priority);
};

module.exports = {
  addPriority: ctrlWrapper(addPriority),
};
