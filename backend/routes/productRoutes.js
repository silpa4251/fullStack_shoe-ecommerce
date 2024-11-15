const express = require("express");
const {
  searchProducts,
  getProducts,
  getProductsById,
  getProductsByCategory,
} = require("../controller/productController");
const productRouter = express.Router();

productRouter.get("/search", searchProducts);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductsById);
productRouter.get("/category/:categoryname", getProductsByCategory);

module.exports = productRouter;
