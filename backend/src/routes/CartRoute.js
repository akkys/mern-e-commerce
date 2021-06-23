const router = require("express").Router();
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/CartContoller");
const { Auth, userMiddleware } = require("../middleware/AuthMiddleware");

router.post("/user/cart/addToCart", Auth, userMiddleware, addItemToCart);

router.post("/user/getCartItems", Auth, userMiddleware, getCartItems);

router.post("/user/cart/removeItem", Auth, userMiddleware, removeCartItems);

module.exports = router;
