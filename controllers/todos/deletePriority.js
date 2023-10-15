const User = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers/HttpError");

const deletePriority = async (req, res) => {
  const { todoId } = req.params;
  const { _id: owner } = req.user;

  const result = await User.findByIdAndUpdate(owner, {
    $pull: { priority: todoId },
  });

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: "Todo deleted from Prioritys",
    deletedTodoId: todoId,
  });
};

module.exports = {
  deletePriority: ctrlWrapper(deletePriority),
};
