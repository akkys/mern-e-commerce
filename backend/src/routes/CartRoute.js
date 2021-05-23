const router = require("express").Router();
const { addItemToCart } = require("../controllers/CartContoller");
const {
  Auth,
  userMiddleware,
} = require("../controllers/middleware/AuthMiddleware");

router.post("/user/cart/addToCart", Auth, userMiddleware, addItemToCart);

// router.get("/category/get", getCategories);

module.exports = router;
