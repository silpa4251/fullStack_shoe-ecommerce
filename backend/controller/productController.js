const Product = require("../models/productModel");
const asyncErroHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");

// Get all products
const getProducts = asyncErroHandler(async (req, res) => {
  const products = await Product.find({});
  generateResponse(res, 200, "Products retrieved successfully", { products });
});

// Get product by ID
const getProductsById = asyncErroHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404 );
  }
  generateResponse(res, 200, "Product retrieved successfully", { product });
});

// Get products by category
const getProductsByCategory = asyncErroHandler(async (req, res) => {
  const { categoryname } = req.params;

  if (!categoryname) {
    throw new CustomError("Category parameter is missing", 400);
  }

  const products = await Product.find({ category: categoryname });
  if (products.length === 0) {
    throw new CustomError("No products found in this category", 404);
  }
  
  generateResponse(res, 200, "Products retrieved successfully by category", { products });

});

// Search for products
const searchProducts = asyncErroHandler(async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    throw new CustomError("Search keyword is missing", 400);
  }

  const products = await Product.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ],
  });

  if (products.length === 0) {
    throw new CustomError("No products found matching the search", 404);
  }

  generateResponse(res, 200, "Products retrieved successfully by search", { products });

});

module.exports = {
  getProducts,
  getProductsById,
  getProductsByCategory,
  searchProducts,
};
