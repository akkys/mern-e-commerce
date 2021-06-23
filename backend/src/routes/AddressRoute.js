const express = require("express");
const { Auth, userMiddleware } = require("../middleware/AuthMiddleware");
const { addAddress, getAddress } = require("../controllers/AddressController");
const router = express.Router();

router.post("/user/address/create", Auth, userMiddleware, addAddress);
router.post("/user/getaddress", Auth, userMiddleware, getAddress);

module.exports = router;
