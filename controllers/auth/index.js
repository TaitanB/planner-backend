const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyEmail, resendVerifyEmail } = require("./verifyEmail");
const { refresh } = require("./refresh");

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
  refresh,
};
