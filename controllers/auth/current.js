const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { name, email, subscription, avatarURL } = req.user;

  res.json({
    name,
    email,
    subscription,
    avatarURL,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
