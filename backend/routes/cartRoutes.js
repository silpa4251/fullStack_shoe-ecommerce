const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  viewCart,
  removeFromCart,
  cartTotal,
  totalProducts,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controller/cartController");
const auth = require("../middlewares/auth");

cartRouter.use(auth);

cartRouter.route("/:id")
  .get(viewCart)  
  .post(addToCart);
  // .delete(removeFromCart);
  // .put(updateCartQuantity);
   
  cartRouter.patch("/:userId/increase", increaseQuantity);
  cartRouter.patch("/:userId/decrease", decreaseQuantity);
  cartRouter.delete("/:userId/remove/:productId/:size", removeFromCart);

  cartRouter.get("/:id/total-price", cartTotal);
  cartRouter.get("/:id/total-items", totalProducts);
  cartRouter.get("/:id/clear", clearCart);

module.exports = cartRouter;
