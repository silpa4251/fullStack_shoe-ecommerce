const express = require("express");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const { getAllUsers, getUserById, addProduct, deleteProduct, updateProduct, getTotalProductsPurchased, getTotalRevenue, getOrderDetails, blockUser, unblockUser } = require("../controller/adminController");
const { getProducts, getProductsById, getProductsByCategory } = require("../controller/productController");
const adminRouter = express.Router();

adminRouter.use(auth);
adminRouter.use(authorize("admin"));

adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:id", getUserById);
adminRouter.patch("/users/block/:id", blockUser);
adminRouter.patch("/users/unblock/:id", unblockUser);

adminRouter.route("/products")
    .get(getProducts)
    .post(addProduct);

adminRouter.route("/products/:id")
    .get(getProductsById)
    .put(updateProduct)
    .delete(deleteProduct);

adminRouter.get("/products/category/:categoryname", getProductsByCategory);

adminRouter.get("/stats/total-products", getTotalProductsPurchased);
adminRouter.get("/stats/total-revenue", getTotalRevenue);
adminRouter.get("/orders", getOrderDetails);

module.exports = adminRouter;