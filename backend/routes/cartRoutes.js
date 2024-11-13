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

router.post("/:id", addToCart);
router.get("/:id", viewCart);
router.delete("/:id", removeFromCart);
router.put("/:id", updateCartQuantity);
router.get("/:id/totalprice", cartTotal);
router.get("/:id/totalitems", totalProducts);
router.get("/:id/clear", clearCart);

module.exports = router;
