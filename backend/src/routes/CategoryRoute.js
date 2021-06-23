const router = require("express").Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/CategoryController");
const {
  Auth,
  upload,
  adminMiddleware,
} = require("../middleware/AuthMiddleware");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

router.post(
  "/category/create",
  Auth,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);
router.post(
  "/category/update",
  upload.array("categoryImage"),
  updateCategories
);
router.get("/category/get", getCategories);

router.post("/category/delete", deleteCategories);

module.exports = router;
