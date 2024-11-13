const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const Cart = require("../models/cartModel")

const placeOrder = async (req, res) => {
    try {
        const userId = req.params.id;  
        const { shippingAddress } = req.body;
        
        const cart = await Cart.findOne({ userId }).populate('products.productId', 'price');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const calculatedTotalPrice = cart.products.reduce((total, item) => {
        return total + item.quantity * item.productId.price;
      }, 0);
        const orderId = `ORD-${new Date().getTime()}`;
        const order = new Order({
            userId,
            products: cart.products,
            totalPrice: calculatedTotalPrice,
            totalItem: cart.products.reduce((sum, item) => sum + item.quantity, 0),
            shippingAddress,
            orderId,
        });

        await order.save();
        await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });
        res.status(200).json({ message: "Order placed successfully", order});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ userId }).populate("products.productId", "name price brand");

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { placeOrder,getUserOrders };


