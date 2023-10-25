const express = require("express");

const {
  getAll,
  add,
  updateById,
  completedTodo,
  deleteById,
  togglePriority,
  getPriority,
  archivedTodo,
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

router.patch("/archived/:todoId", unauthorized, isValidId, archivedTodo);

router.delete("/delete/:todoId", unauthorized, isValidId, deleteById);

router.get("/priority", unauthorized, getPriority);

router.patch("/priority/:todoId", unauthorized, isValidId, togglePriority);

module.exports = router;
