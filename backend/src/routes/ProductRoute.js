const router = require("express").Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
  Auth,
  adminMiddleware,
} = require("../controllers/middleware/AuthMiddleware");
const {
  createProduct,
  getProductBySlug,
} = require("../controllers/ProductController");

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
  "/product/create",
  Auth,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

router.get("/products/:slug", getProductBySlug);

module.exports = router;
