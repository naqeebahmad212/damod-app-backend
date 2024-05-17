const { emailController } = require("../controller");

const router = require("express").Router();

router.post("/send", emailController.passwordEmail);

module.exports = router;
