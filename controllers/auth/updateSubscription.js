const User = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  const { email, subscription: sub } = result;
  const response = { email, subscription: sub };

  return res.json(response);
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
