const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncErroHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");

const addToCart = asyncErroHandler(async (req, res) => {
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


const viewCart = asyncErroHandler(async (req, res) => {
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

const removeFromCart = asyncErroHandler(async (req, res) => {
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


const updateCartQuantity = asyncErroHandler(async (req, res) => {
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


const cartTotal = asyncErroHandler( async (req, res) => {
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


const totalProducts = asyncErroHandler(async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found" , 404);
  }
  const totalItems = cart.products.length;
  generateResponse(res,200,"total items in cart",{ totalItems });
});


const clearCart = asyncErroHandler( async (req, res) => {
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
