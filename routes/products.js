const express = require("express");
var router = express.Router();
const productValidator = require("../middleware/validator/product");
const productController = require("../controllers/products");
const tokenValidator=require('../middleware/tokenValidator')

router.post("/locad/product/createNew",tokenValidator.isAuth,productValidator.productValidator,productController.createNewProduct);
router.post("/locad/product/getProducts",tokenValidator.isAuth,productValidator.productValidator,productController.getAllProduct);
router.post("/locad/product/deleteProduct",tokenValidator.isAuth,productValidator.productValidator,productController.deleteProduct);
router.post("/locad/product/updateProduct",tokenValidator.isAuth,productValidator.productValidator,productController.updateProduct);
// router.post("/signup", authValidator.signUpValidator, authController.userSignup)


exports.router = router;