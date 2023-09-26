const express = require("express");

const {
  register,
  login,
  logout,
  current,
  refresh,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/auth");

const {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
  refreshSchema,
} = require("../../schemas/users");

const { validateBody } = require("../../decorators");
const { unauthorized, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.post("/logout", unauthorized, logout);

router.get("/current", unauthorized, current);

router.post("/refresh", validateBody(refreshSchema), refresh);

router.patch(
  "/",
  unauthorized,
  validateBody(userSubscriptionSchema),
  updateSubscription
);

router.patch("/avatars", unauthorized, upload.single("avatar"), updateAvatar);

module.exports = router;
