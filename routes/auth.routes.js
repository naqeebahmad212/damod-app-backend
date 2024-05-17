const { authController } = require("../controller");
const routes = require("express").Router();

routes.post("/register", authController.register);
routes.post("/login", authController.login);

module.exports = routes;
