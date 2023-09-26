const Joi = require("joi");

const {
  nameRegex,
  birthdayRegex,
  passwordRegex,
  phoneRegex,
  cityRegex,
  userSubscription,
} = require("../constants/constants");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(26).pattern(nameRegex).required().messages({
    "string.base": "The name must be a string of 2 to 26 symbols.",
    "any.required": "The name field is required.",
    "string.min": "The name must be not less 2 symbols.",
    "string.max": "The name must be no more 26 symbols.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.base": "The password must be a string of 6 to 16 symbols.",
      "any.required": "The password field is required.",
      "string.min": "The password must be not less 6 symbols.",
      "string.max": "The password must be no more 16 symbols..",
    }),
  subscription: Joi.string().valid(...userSubscription),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.base": "The password must be a string of 6 to 16 symbols.",
      "any.required": "The password field is required.",
      "string.min": "The password must be not less 6 symbols.",
      "string.max": "The password must be no more 16 symbols..",
    }),
  subscription: Joi.string().valid(...userSubscription),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(26).pattern(nameRegex).messages({
    "string.base": "The name must be a string of 2 to 26 symbols.",
    "string.min": "The name must be not less 2 symbols.",
    "string.max": "The name must be no more 26 symbols.",
  }),
  birthday: Joi.string()
    .pattern(birthdayRegex)
    .message("Invalid birthday format. Please use DD-MM-YYYY.")
    .custom((value, helpers) => {
      const [day, month, year] = value.split("-");
      const dateObj = new Date(`${year}-${month}-${day}`);

      if (isNaN(dateObj.getTime())) {
        return helpers.error("any.invalid", {
          message: "Invalid birthday format. Please use DD-MM-YYYY.",
        });
      }

      const isValidDate =
        dateObj.getDate() === parseInt(day, 10) &&
        dateObj.getMonth() + 1 === parseInt(month, 10) &&
        dateObj.getFullYear() === parseInt(year, 10);
      if (!isValidDate) {
        return helpers.error("any.invalid", {
          message: "Invalid birthday date. Please enter a valid date.",
        });
      }

      const currentDate = new Date();
      if (dateObj > currentDate) {
        return helpers.error("any.invalid", {
          message: "Birthday date cannot be in the future.",
        });
      }

      return value;
    }, "custom validation"),
  phone: Joi.string().pattern(phoneRegex).messages({
    "string.base": "The phone must be a string.",
    "string.pattern.base": "The phone must be in format +380671234567.",
  }),
  city: Joi.string().min(3).pattern(cityRegex).messages({
    "string.base": "The city must be a string.",
    "string.min": "The city must be not less 3 symbols.",
  }),
  avatarURL: Joi.string().uri().messages({
    "string.base": "The avatarURL must be a string.",
    "string.uri": "The avatarURL must be a valid URL.",
  }),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...userSubscription),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
  userSubscriptionSchema,
  emailSchema,
  refreshSchema,
};
