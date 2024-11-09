const express = require("express");
const router = express.Router();

const {register ,login} = require("../controller/authController");
const { searchProducts, getProducts , getProductsById , getProductsByCategory } = require("../controller/productController");
const { addToCart,viewCart, removeFromCart, updateCartQuantity, cartTotal ,totalProducts, clearCart} = require("../controller/cartController");

router.post("/register",register)
router.post("/login",login)
router.get("/products/search" , searchProducts)
router.get("/products",getProducts)
router.get("/products/:id",getProductsById)
router.get("/products/category/:categoryname",getProductsByCategory)
router.post("/:id/cart",addToCart)
router.get("/:id/cart",viewCart)
router.delete("/:id/cart",removeFromCart)
router.put("/:id/cart",updateCartQuantity)
router.get("/:id/cart/totalorice", cartTotal)
router.get("/:id/cart/totalproducts", totalProducts)
router.get("/:id/cart/clear" , clearCart)



module.exports = router;