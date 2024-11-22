const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  viewCart,
  removeFromCart,
  updateCartQuantity,
  cartTotal,
  totalProducts,
  clearCart,
} = require("../controller/cartController");
const auth = require("../middlewares/auth");

cartRouter.use(auth);

cartRouter.route("/:id")
  .get(viewCart)  
  .post(addToCart)
  .delete(removeFromCart)
  .put(updateCartQuantity);

  cartRouter.get("/:id/total-price", cartTotal);
  cartRouter.get("/:id/total-items", totalProducts);
  cartRouter.get("/:id/clear", clearCart);

module.exports = cartRouter;
