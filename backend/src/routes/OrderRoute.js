const router = require("express").Router();
const {
  addOrder,
  getOrders,
  getOrder,
} = require("../controllers/OrderController");
const { Auth, userMiddleware } = require("../middleware/AuthMiddleware");

router.post("/addOrder", Auth, userMiddleware, addOrder);

router.get("/getOrders", Auth, userMiddleware, getOrders);

router.post("/getOrder", Auth, userMiddleware, getOrder);

// router.post("/user/getCartItem", Auth, userMiddleware, getCartItem);
module.exports = router;
