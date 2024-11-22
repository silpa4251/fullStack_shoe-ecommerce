const express = require("express");
const wishlistRouter = express.Router();
const {
  addToWishlist,
  viewWishlist,
  removeFromWishlist,
  moveProductToCart,
  clearWishlist,
} = require("../controller/wishlistController");
const auth = require("../middlewares/auth");

wishlistRouter.use(auth);

wishlistRouter.route("/:id")
  .post(addToWishlist)
  .get(viewWishlist)
  .delete(removeFromWishlist);

  wishlistRouter.post("/:id/add-cart", moveProductToCart);
  wishlistRouter.get("/:id/clear", clearWishlist);

module.exports = wishlistRouter;
