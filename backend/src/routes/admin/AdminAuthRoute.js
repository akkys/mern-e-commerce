const router = require("express").Router();
const {
  signup,
  signin,
  signout,
} = require("../../controllers/admin/AdminAuthController");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../../validator/Auth");
const { Auth } = require("../../controllers/middleware/AuthMiddleware");

router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);

router.post("/admin/signout", Auth, signout);

module.exports = router;
