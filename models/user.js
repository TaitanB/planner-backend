const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
// const todoSchema = require("./todo");
const { emailRegexp, userSubscription } = require("../constants/users");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    // todos: {
    //   type: [todoSchema],
    //   default: [],
    // },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: [...userSubscription],
      default: "starter",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
