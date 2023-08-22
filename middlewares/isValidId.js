const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { todoId } = req.params;
  // console.log(req.params);
  // console.log(todoId);
  if (!isValidObjectId(todoId)) {
    next(HttpError(400, `${todoId} is not valid id`));
  }

  next();
};

module.exports = isValidId;
