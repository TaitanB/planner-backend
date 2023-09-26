const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const { v4 } = require("uuid");

// const { SECRET_KEY } = process.env;
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;
// const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { d: "identicon" });
  const verificationToken = v4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  // const verifyUser = {
  //   to: email,
  //   subject: "Verification email",
  //   html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyUser);

  const { _id: id } = newUser;
  const payload = {
    id,
  };

  // const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(id, { accessToken, refreshToken, newUser });

  res.status(201).json({
    accessToken,
    refreshToken,
    newUser: true,
    user: {
      _id: id,
      name: newUser.name,
      email: newUser.email,
      birthday: newUser.birthday,
      phone: newUser.phone,
      city: newUser.city,
      avatarURL: newUser.avatarURL,
      subscription: newUser.subscription,
      priority: newUser.priority,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
