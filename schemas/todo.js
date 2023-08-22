const Joi = require("joi");

const addTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  plannedDate: Joi.date().required(),
});

const completedTodoSchema = Joi.object({
  completedDate: Joi.date().required(),
});

const updateTodoSchema = Joi.object({
  description: Joi.string().required(),
});

module.exports = {
  addTodoSchema,
  completedTodoSchema,
  updateTodoSchema,
};
