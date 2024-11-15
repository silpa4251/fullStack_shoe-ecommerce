const express = require("express");
const orderRouter = express.Router();
const { placeOrder, getUserOrders } = require("../controller/orderController");
const auth = require("../middlewares/auth");

orderRouter.use(auth);

orderRouter.post("/:id/checkout", placeOrder);
orderRouter.get("/:id", getUserOrders);

module.exports = orderRouter;
