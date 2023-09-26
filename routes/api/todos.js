const express = require("express");

const {
  getAll,
  add,
  updateById,
  completedTodo,
  deleteById,
} = require("../../controllers/todos");

const { isValidId, unauthorized } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const { addTodoSchema, updateTodoSchema } = require("../../schemas/todo");

const router = express.Router();

router.get("/", unauthorized, getAll);

router.post("/", unauthorized, validateBody(addTodoSchema), add);

router.patch(
  "/update/:todoId",
  unauthorized,
  isValidId,
  validateBody(updateTodoSchema),
  updateById
);

router.patch("/completed/:todoId", unauthorized, isValidId, completedTodo);

router.delete("/delete/:todoId", unauthorized, isValidId, deleteById);

module.exports = router;
