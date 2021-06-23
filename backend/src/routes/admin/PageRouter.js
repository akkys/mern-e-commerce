const {
  createPage,
  getPage,
} = require("../../controllers/admin/PageController");
const router = require("express").Router();
const {
  upload,
  Auth,
  adminMiddleware,
} = require("../../middleware/AuthMiddleware");

router.post(
  "/page/create",
  Auth,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

router.get("/page/:category/:type", getPage);

module.exports = router;
