const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { generateResponse } = require("../utils/helpers");
const CustomError = require("../utils/customError");


// Add or remove a product from the wishlist
const addToWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404); 
  }

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({
      userId,
      products: [{ productId }],
    });
    await wishlist.save();
    return generateResponse(res, 200, "Product added to wishlist", { wishlist });
  }

  const existingProductIndex = wishlist.products.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingProductIndex !== -1) {
    wishlist.products.splice(existingProductIndex, 1);
    await wishlist.save();
    return generateResponse(res, 200, "Product removed from wishlist", { wishlist });
  } 
  else {
    wishlist.products.push({ productId });
    await wishlist.save();
    return generateResponse(res, 200, "Product added to wishlist", { wishlist });
  }
});



// View wishlist
const viewWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const wishlist = await Wishlist.findOne({ userId }).populate(
    "products.productId",
    "name price brand"
  );

  if (!wishlist) {
    throw new CustomError("Wishlist not found", 404);
  }

  generateResponse(res, 200, "Wishlist retrieved successfully", { wishlist }); 
});


// Remove a specific product from the wishlist
const removeFromWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    throw new CustomError("Wishlist not found", 404);
  }

  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter(
    (item) => item.productId.toString() !== productId
  );

  if (wishlist.products.length === initialLength) {
    throw new CustomError("Product not found in wishlist", 404);
  }

  await wishlist.save();
  generateResponse(res, 200, "Product removed from wishlist");
});


// Move product from wishlist to cart
const moveProductToCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);   
  }

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    throw new CustomError("Wishlist not found", 404);
  }

  const wishlistItemIndex = wishlist.products.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (wishlistItemIndex === -1) {
    throw new CustomError("Product not in wishlist", 404);
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
  } 
  else {
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
  generateResponse(res, 200, "Product moved from wishlist to cart", { cart });

});


// Clear all items from the wishlist
const clearWishlist = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    throw new CustomError("Wishlist not found", 404);
  }

  wishlist.products = [];
  await wishlist.save();
  generateResponse(res, 200, "Wishlist cleared", { wishlist });
  
});

module.exports = {
  addToWishlist,
  viewWishlist,
  removeFromWishlist,
  moveProductToCart,
  clearWishlist,
};
