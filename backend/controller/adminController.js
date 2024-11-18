const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");

// Get all users
const getAllUsers = asyncErrorHandler(async (req, res) => {
    const users = await User.find({});
    generateResponse(res, 200, "All users retrieved successfully", { users });
});

// View a specific user
const getUserById = asyncErrorHandler(async (req,res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user) {
        throw new CustomError("User not found",404);
    }
    generateResponse(res,200,"User retrieved successfully",{ user });
});

// Block a user
const blockUser = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
  
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
  
    if (user.isBlocked) {
      throw new CustomError("User is already blocked", 400);
    }
  
    user.isBlocked = true;
    await user.save();
  
    generateResponse(res, 200, "User blocked successfully", { user });
});


const unblockUser = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
  
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
  
    if (!user.isBlocked) {
      throw new CustomError("User is not blocked", 400);
    }
  
    user.isBlocked = false;
    await user.save();
  
    generateResponse(res, 200, "User unblocked successfully", { user });
});
  
  
// Add a product
const addProduct = asyncErrorHandler(async (req, res) => {
    const { name, category } = req.body;

    const existingProduct = await Product.findOne({ name, category });
    if(existingProduct){
        throw new CustomError("Product already exists with same name and category.")
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    generateResponse(res, 201, "Product added successfully",{ newProduct });

});

// update a product
const updateProduct = asyncErrorHandler( async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        {new: true, runValidators: true}
    );
    if(!product){
        throw new CustomError("Product not found",404);
    }
    generateResponse(res, 200, "Product updated successfully", { product });
})

// Delete a product
const deleteProduct = asyncErrorHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
        throw new CustomError("Product not found",404);
    }
    product.isDeleted = true;
    await product.save();
    generateResponse(res, 200 , "Product deleted successfully", { product });

})

const getTotalProductsPurchased = asyncErrorHandler( async (req,res) => {
    const orders = await Order.find({});
    const totalProducts = orders.reduce((acc, order) =>acc + order.totalItem, 0)
    generateResponse(res, 200, "Total products purchased counted", {totalProducts});

})

const getTotalRevenue = asyncErrorHandler(async (req, res) => {
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    generateResponse(res, 200, "total revenue", {totalRevenue});
});


const getOrderDetails = asyncErrorHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate("userId", "name email") // Populate user details
        .populate("products.productId", "name price brand"); // Populate product details
    generateResponse(res, 200, "order details", { orders });
});

module.exports = { getAllUsers, getUserById, addProduct, updateProduct, deleteProduct, getTotalProductsPurchased, getOrderDetails, getTotalRevenue }