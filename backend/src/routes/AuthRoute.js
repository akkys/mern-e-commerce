const router = require("express").Router();
const { signup, signin } = require("../controllers/AuthController");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../validator/Auth");

router.post("/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/signup", validateSignUpRequest, isRequestValidated, signup);

module.exports = router;
