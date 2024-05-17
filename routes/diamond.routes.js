const router = require("express").Router();
const { diamondController } = require("../controller");
const { adminAuthMiddleware } = require("../middleware/adminAuthMiddleware");
const { authMiddleware } = require("../middleware/authMiddleWare");

/**
 * *Note:  Replace the transporterDataController with your controller
 */

router.post("/create", adminAuthMiddleware, diamondController.create);
router.get("/", authMiddleware, diamondController.findAll);
router.get(
  "/shape",
  adminAuthMiddleware,
  diamondController.findAllDiamondsByShape
);
router.get("/:id", authMiddleware, diamondController.find);
router.put("/:id", adminAuthMiddleware, diamondController.update);
router.delete("/:id", adminAuthMiddleware, diamondController.remove);

module.exports = router;
