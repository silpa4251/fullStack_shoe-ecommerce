const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controller/orderController");
const auth = require("../middlewares/auth");

router.use(auth);

router.post("/:id/checkout", placeOrder);
router.get("/:id", getUserOrders);

module.exports = router;
