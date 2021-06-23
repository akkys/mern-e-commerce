const router = require("express").Router();
const {
  initialData,
  userInitialData,
} = require("../../controllers/admin/InitialDataController");
const {
  Auth,
  adminMiddleware,
  userMiddleware,
} = require("../../middleware/AuthMiddleware");

router.post("/initialData", Auth, adminMiddleware, initialData);

router.post("/userInitialData", userInitialData);

module.exports = router;
