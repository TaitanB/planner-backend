const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, {
    accessToken: "",
    refreshToken: "",
  });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
