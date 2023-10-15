const express = require("express");

const {
  getAll,
  add,
  updateById,
  completedTodo,
  deleteById,
  addPriority,
  deletePriority,
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

router.patch("/priority/add/:todoId", unauthorized, isValidId, addPriority);

router.patch(
  "/priority/delete/:todoId",
  unauthorized,
  isValidId,
  deletePriority
);

module.exports = router;
