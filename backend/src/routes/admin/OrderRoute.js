const router = require("express").Router();
const { Auth, adminMiddleware } = require("../../middleware/AuthMiddleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controllers/admin/OrderController");

router.post("/order/update", Auth, adminMiddleware, updateOrder);

router.post(
  "/order/getCustomerOrders",
  Auth,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
