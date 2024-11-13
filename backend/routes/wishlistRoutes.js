const express = require("express");
const router = express.Router();
const { addToWishlist, viewWishlist, removeFromWishlist, moveProductToCart, clearWishlist } = require("../controller/wishlistController");
const auth = require("../middlewares/auth");

router.use(auth);



router.post("/:id", addToWishlist);
router.get("/:id", viewWishlist);
router.delete("/:id", removeFromWishlist);
router.post("/:id/addtocart", moveProductToCart);
router.get("/:id/clear", clearWishlist);


module.exports = router;