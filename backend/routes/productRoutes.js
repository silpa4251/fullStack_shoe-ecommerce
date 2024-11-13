const express = require("express");
const { searchProducts, getProducts, getProductsById, getProductsByCategory } = require("../controller/productController");
const router = express.Router();

router.get("/search" , searchProducts)
router.get("/",getProducts)
router.get("/:id",getProductsById)
router.get("/category/:categoryname",getProductsByCategory)

module.exports = router;