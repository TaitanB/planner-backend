const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email is wrong");
  }

  // if (!user.verify) {
  //   throw HttpError(401, "Email not verified");
  // }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(id, { accessToken, refreshToken, user });

  res.json({
    accessToken,
    refreshToken,
    user: {
      _id: id,
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      phone: user.phone,
      city: user.city,
      avatarURL: user.avatarURL,
      subscription: user.subscription,
      priority: user.priority,
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
