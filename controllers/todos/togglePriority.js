const User = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");

const togglePriority = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;
  let message;
  const user = await User.findOne({ _id: owner });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isTodoInPriority = user.priority.includes(todoId);

  if (isTodoInPriority) {
    await User.findByIdAndUpdate(owner, { $pull: { priority: todoId } });
    message = `Todo whith id - ${todoId} deleted from Prioritys`;
  } else {
    await User.findByIdAndUpdate(owner, { $addToSet: { priority: todoId } });
    message = `Todo whith id - ${todoId} added to Prioritys`;
  }

  const updatedUser = await User.findOne({ _id: owner });

  res.json({
    message: message,
    priority: updatedUser.priority,
  });
};

module.exports = {
  togglePriority: ctrlWrapper(togglePriority),
};
