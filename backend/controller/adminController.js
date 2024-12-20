const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");

// Get all users
const getAllUsers = asyncErrorHandler(async (req, res) => {
    const users = await User.aggregate([
      {
        $project: {
            username: 1,
            email: 1,
            role: 1,
            createdAt: 1,
          }
      }
  ]);
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
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true }, // Set isBlocked to true
      { new: true } // Return the updated user object
    );
  
    generateResponse(res, 200, "User blocked successfully", { user: updatedUser });
});

// Unblock a user
const unblockUser = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
  
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
  
    if (!user.isBlocked) {
      throw new CustomError("User is not blocked", 400);
    }
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false }, // Set isBlocked to false
      { new: true } // Return the updated user object
    );
  
    generateResponse(res, 200, "User unblocked successfully", { user: updatedUser });
});
  
// Count the No.of users
const getUserStats = asyncErrorHandler(async (req, res) => {
    const userStats = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          userCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  
    generateResponse(res, 200, "User registration stats retrieved successfully", { userStats });
});

// Top customers
const getTopCustomers = asyncErrorHandler(async (req, res) => {
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: "$userId", // Group by user
          totalSpent: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userName: "$userDetails.username",
          email: "$userDetails.email",
          totalSpent: 1,
        },
      },
      { $sort: { totalSpent: -1 } }, 
      { $limit: 5 }, 
    ]);
  
    generateResponse(res, 200, "Top customers retrieved successfully", { topCustomers });
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

// Calculare total products purchased 
const getTotalProductsPurchased = asyncErrorHandler( async (req,res) => {
    const result = await Order.aggregate([
        { $unwind: "$products"},
        {
            $group:{
                _id: null,
                totalProducts: { $sum: "$products.quantity"},

            },
        },
    ]);
    const totalProducts = result.length ? result[0].totalProducts : 0;
    generateResponse(res, 200, "Total products purchased counted", { totalProducts });

})

// Calculating the total revenue
const getTotalRevenue = asyncErrorHandler(async (req, res) => {
    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice"},
            },
        },
    ]);
    const totalRevenue = result.length ? result[0].totalRevenue : 0;
    generateResponse(res, 200, "total revenue", {totalRevenue});
});

//Calculate total orders
const getTotalOrders = asyncErrorHandler( async (req,res) => {
  const orderStats = await Order.aggregate([
      {
          $group:{
              _id: null,
              totalOrders: { $sum: 1},

          },
      },
  ]);

  generateResponse(res, 200, "Total orders counted", { orderStats });

})

// Fetching all the orders
const getOrderDetails = asyncErrorHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate("userId", "username email") // Populate user details
        .populate("products.productId", "name price brand"); // Populate product details
    generateResponse(res, 200, "order details", { orders });
});

module.exports = { getAllUsers, getUserById, addProduct, updateProduct, deleteProduct, getTotalProductsPurchased, getTotalOrders, getOrderDetails, getTotalRevenue, blockUser, unblockUser, getUserStats, getTopCustomers}