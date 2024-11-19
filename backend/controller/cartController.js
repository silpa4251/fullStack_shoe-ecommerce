const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");


// Adding products to cart
const addToCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found",404);
  }

  // Check if the user's cart exists
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    // If no cart exists, create a new one
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const existingProduct = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
  if (existingProduct !== -1) {
    // Update quantity if product exists in the cart
    cart.products[existingProduct].quantity += quantity;
  } else {
      // Add new product to the cart
      cart.products.push({ productId, quantity });
    }
  }
    await cart.save();
    generateResponse(res, 200, "Product added to cart successfully", { cart });
 
});


// View the cart items
const viewCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId }).populate(
    "products.productId",
    "name price brand"
  );
  if (!cart) {
    throw new CustomError("Cart not found" ,404);
  }
  generateResponse(res,200, "Cart details", { cart });
});


// Removing a product from the cart
const removeFromCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  // Filter out the product to remove it from the cart
  cart.products = cart.products.filter(
  (item) => item.productId.toString() !== productId
  );
  await cart.save();
  generateResponse(res,200,"Product removed from the cart");
 
});

// Updating the product quantity
const updateCartQuantity = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;
  if (quantity < 1) {
    throw new CustomError("Quantity must be at least 1" , 400);
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }
  
  const existingProduct = cart.products.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingProduct === -1) {
    throw new CustomError("Product not in cart", 404);
  }

  // Update quantity
  cart.products[existingProduct].quantity = quantity;
  await cart.save();
  generateResponse(res,200,"Cart updated", {cart});
});

// viewing the total price of products in the cart
const cartTotal = asyncErrorHandler( async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId }).populate("products.productId");

  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  let totalPrice = 0;
  cart.products.forEach((item) => {
    totalPrice += item.productId.price * item.quantity;
  });

  generateResponse(res,200,"total price calculated", { totalPrice });
});


// Get the total products in the cart
const totalProducts = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found" , 404);
  }
  const totalItems = cart.products.length;
  generateResponse(res,200,"total items in cart",{ totalItems });
});


// Clear the cart
const clearCart = asyncErrorHandler( async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  // Clear all products in the cart
  cart.products = [];
  await cart.save();
  generateResponse(res, 200, "Cart cleared", {cart });
});

module.exports = {
  addToCart,
  viewCart,
  removeFromCart,
  updateCartQuantity,
  cartTotal,
  totalProducts,
  clearCart,
};
