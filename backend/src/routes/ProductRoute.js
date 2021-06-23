const router = require("express").Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
  createProduct,
  getProductBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  getAllProducts,
  updateProduct,
} = require("../controllers/ProductController");
const {
  Auth,
  adminMiddleware,
  userMiddleware,
} = require("../middleware/AuthMiddleware");

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

router.post(
  "/product/update",
  Auth,
  adminMiddleware,
  upload.array("productPicture"),
  updateProduct
);

router.get("/products/:slug", getProductBySlug);

router.get("/product/:productId", getProductDetailsById);

router.delete(
  "/product/deleteProductById",
  Auth,
  adminMiddleware,
  deleteProductById
);

router.post("/product/getProducts", Auth, adminMiddleware, getProducts);

router.post("/product/getAllProducts", Auth, userMiddleware, getAllProducts);

module.exports = router;
