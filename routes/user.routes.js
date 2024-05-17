const { diamondController, userController } = require("../controller");
const { adminAuthMiddleware } = require("../middleware/adminAuthMiddleware");

const router = require("express").Router();

router.get("/count", adminAuthMiddleware, userController.usersCount);

module.exports = router;
