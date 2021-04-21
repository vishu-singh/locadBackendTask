const express = require("express");
var router = express.Router();
const authValidator = require("../middleware/validator/user");
const authController = require("../controllers/auth");

router.post("/locad/user/login",authValidator.loginValidator,authController.loginUser);
router.post("/locad/user/signup",authValidator.loginValidator,authController.createNewUser)
// router.post("/signup", authValidator.signUpValidator, authController.userSignup)


exports.router = router;
