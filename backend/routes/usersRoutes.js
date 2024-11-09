const express = require("express");
const router = express.Router();

const {register ,login} = require("../controller/authController");
const { getProducts , getProductsById , getProductsByCategory} = require("../controller/productController");

router.post("/register",register)
router.post("/login",login)
router.get("/products",getProducts)
router.get("/products/:id",getProductsById)
router.get("/products/category/:categoryname",getProductsByCategory)

module.exports = router;