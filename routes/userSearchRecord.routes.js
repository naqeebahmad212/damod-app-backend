const { userSearchRecordController } = require("../controller");
const { adminAuthMiddleware } = require("../middleware/adminAuthMiddleware");
const { authMiddleware } = require("../middleware/authMiddleWare");

const router = require("express").Router();

router.post("/create", authMiddleware, userSearchRecordController.create);
router.get("/", adminAuthMiddleware, userSearchRecordController.findAll);
router.get(
  "/mostSearchedShape",
  adminAuthMiddleware,
  userSearchRecordController.searchedShape
);
router.get("/:id", authMiddleware, userSearchRecordController.find);
router.put("/:id", authMiddleware, userSearchRecordController.update);
router.delete("/:id", authMiddleware, userSearchRecordController.remove);

module.exports = router;
