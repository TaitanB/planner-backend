const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.status(204).json();
};

module.exports = {
  logout: ctrlWrapper(logout),
};
