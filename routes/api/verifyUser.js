const express = require("express");

const { verifyEmail, resendVerifyEmail } = require("../../controllers/auth");
const { emailSchema } = require("../../schemas/users");
const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(emailSchema), resendVerifyEmail);

module.exports = router;
