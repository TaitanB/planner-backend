const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    plannedDate: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    overdueDate: {
      type: Date,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

todoSchema.post("save", handleMongooseError);

const Todo = model("todo", todoSchema);

module.exports = Todo;
