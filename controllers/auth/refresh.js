const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      throw HttpError(403, "Token invalid");
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = {
  refresh: ctrlWrapper(refresh),
};
