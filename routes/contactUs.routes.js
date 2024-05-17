const router = require("express").Router();
const { contactUsController } = require("../controller");
const { adminAuthMiddleware } = require("../middleware/adminAuthMiddleware");

/**
 * *Note:  Replace the templateController with your controller
 */

router.post("/create", contactUsController.create);
router.get("/", adminAuthMiddleware, contactUsController.findAll);
router.get("/:id", contactUsController.find);
router.put("/:id", contactUsController.update);
router.delete("/:id", contactUsController.remove);

module.exports = router;
