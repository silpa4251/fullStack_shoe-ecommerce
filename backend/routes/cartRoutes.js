const express = require("express");
const router = express.Router();
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

router.use(auth);

router.route("/:id")
  .post(addToCart)
  .get(viewCart)
  .delete(removeFromCart)
  .put(updateCartQuantity);

router.get("/:id/totalprice", cartTotal);
router.get("/:id/totalitems", totalProducts);
router.get("/:id/clear", clearCart);

module.exports = router;
