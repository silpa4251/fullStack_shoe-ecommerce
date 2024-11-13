const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

const addToWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [{ productId }],
      });
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product added to wishlist", wishlist });
    }

    const existingProductIndex = wishlist.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      wishlist.products.splice(existingProductIndex, 1);
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product removed from wishlist", wishlist });
    } else {
      wishlist.products.push({ productId });
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product added to wishlist successfully", wishlist });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "products.productId",
      "name price brand"
    );
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      res.status(404).json({ message: " Wishlist not found" });
    }
    const initialLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== productId
    );
    if (wishlist.products.length === initialLength) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }
    await wishlist.save();
    res.status(200).json({ message: "Product removed from the  wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const moveProductToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    const wishlistItemIndex = wishlist.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (wishlistItemIndex === -1) {
      return res.status(404).json({ message: "Product not in wishlist" });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
    } else {
      const cartItemIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (cartItemIndex !== -1) {
        cart.products[cartItemIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }
    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== productId
    );
    await wishlist.save();
    await cart.save();

    res
      .status(200)
      .json({ message: "Product moved from wishlist to cart", cart });
  } catch (error) {
    console.error("Error moving product to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = [];
    await wishlist.save();
    res.status(200).json({ message: "Wishlist cleared", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToWishlist,
  viewWishlist,
  removeFromWishlist,
  moveProductToCart,
  clearWishlist,
};
