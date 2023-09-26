const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const {
  nameRegex,
  birthdayRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  cityRegex,
  userSubscription,
} = require("../constants/constants");

const userSchema = new Schema(
  {
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      match: passwordRegex,
      required: [true, "Set password for user"],
    },
    avatarURL: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      match: birthdayRegex,
      default: "",
    },
    phone: {
      type: String,
      match: phoneRegex,
      default: "",
    },
    city: {
      type: String,
      match: cityRegex,
      default: "",
    },
    priority: {
      type: [String],
      default: [],
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
