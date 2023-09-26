const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const {
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarURL,
    subscription,
    priority,
  } = req.user;

  res.json({
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarURL,
    subscription,
    priority,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
