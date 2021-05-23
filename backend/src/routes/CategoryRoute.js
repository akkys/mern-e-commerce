const router = require("express").Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
  createCategory,
  getCategories,
} = require("../controllers/CategoryController");
const {
  Auth,
  adminMiddleware,
} = require("../controllers/middleware/AuthMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  Auth,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);

router.get("/category/get", getCategories);

module.exports = router;
