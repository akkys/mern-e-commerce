const router = require("express").Router();
const {
  signup,
  signin,
  signout,
} = require("../../controllers/admin/AdminAuthController");
const { Auth } = require("../../middleware/AuthMiddleware");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../../validator/Auth");

router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);

router.post("/admin/signout", Auth, signout);

module.exports = router;
