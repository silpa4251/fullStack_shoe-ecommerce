const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");


// Placing an order
const placeOrder = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { shippingAddress } = req.body;

   // Fetch the user's cart
  const cart = await Cart.findOne({ userId }).populate(
    "products.productId",
    "price"
  );
  if (!cart || cart.products.length === 0) {
    throw new CustomError("Cart is empty", 400);
  }

   // Calculate the total price of the order
  const calculatedTotalPrice = cart.products.reduce((total, item) => {
    return total + item.quantity * item.productId.price;
  }, 0);
  
  // Generate a unique order ID
  const orderId = `ORD-${new Date().getTime()}`;
  
  // Create a new order
  const order = new Order({
    userId,
    products: cart.products,
    totalPrice: calculatedTotalPrice,
    totalItem: cart.products.reduce((sum, item) => sum + item.quantity, 0),
    shippingAddress,
    orderId,
  });

  await order.save();

  // Clear the user's cart after placing the order
  await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });

  // Send a success response
  generateResponse(res, 200, "Order placed successfully", { order });
 
});


// fetching all orders of a specific user
const getUserOrders = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;

  // Fetch orders for the user
  const orders = await Order.find({ userId }).populate(
    "products.productId",
    "name price brand"
  );

  if (orders.length === 0) {
    throw new CustomError("No orders found for this user", 404);
  }

  // Send a success response with orders
  generateResponse(res, 200, "User orders retrieved successfully", { orders });  
});

module.exports = { placeOrder, getUserOrders };
