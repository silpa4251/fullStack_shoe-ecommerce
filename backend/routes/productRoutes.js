const express = require("express");
const {
  searchProducts,
  getProducts,
  getProductsById,
  getProductsByCategory,
  getFeaturedProducts,
} = require("../controller/productController");
const productRouter = express.Router();

productRouter.get("/search", searchProducts);
productRouter.get("/", getProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/:id", getProductsById);
productRouter.get("/category/:categoryname", getProductsByCategory);

module.exports = productRouter;
