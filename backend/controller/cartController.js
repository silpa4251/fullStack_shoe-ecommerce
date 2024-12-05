const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { generateResponse } = require("../utils/helpers");


// Adding products to cart
const addToCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const { productId, size, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found",404);
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    const price = product.price;
    const totalProductPrice = price * quantity;
    const totalCartPrice = totalProductPrice;
    cart = new Cart({
      userId,
      products: [{ productId, size, quantity,price, totalProductPrice }],
      totalCartPrice,
    });
  } else {
    const existingProduct = cart.products.findIndex(
      (item) => item.productId.equals(productId) && item.size == size
    );
  if (existingProduct !== -1) {
    cart.products[existingProduct].quantity += quantity;
    cart.products[existingProduct].totalProductPrice = cart.products[existingProduct].quantity * product.price

  } else {
    const totalProductPrice = product.price * quantity;
      cart.products.push({ productId, size, quantity, price: product.price, totalProductPrice  });
    }
    cart.totalCartPrice = cart.products.reduce(
      (total, item) => total + item.totalProductPrice,
      0
    );
  }
    await cart.save();
    cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price brand image_url");
    generateResponse(res, 200, "Product added to cart successfully", { cart });
 
});


// View the cart items
const viewCart = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId }).populate(
    "products.productId",
    "name price brand image_url"
  );
  if (!cart) {
    throw new CustomError("Cart not found" ,404);
  }
  generateResponse(res,200, "Cart details", { cart });
});


const removeFromCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId, size } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new CustomError("Cart not found",404);   
    }
    cart.products = cart.products.filter((product) => !product.productId.equals(productId) || product.size != size);
  
    const totalCartPrice = cart.products.reduce(
      (total, product) => total + product.totalProductPrice,
      0
    );
    cart.totalCartPrice = totalCartPrice;
    await cart.save();
    cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price brand image_url");
    return res.status(200).json({ message: 'Product removed from cart', data: cart });

});



const increaseQuantity = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId, size } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  const productIndex = cart.products.findIndex(
    (p) => p.productId.equals(productId)  && p.size == size
  );

  if (productIndex !== -1) {
    const product = cart.products[productIndex];
    product.quantity += 1;
    product.totalProductPrice = product.quantity * product.price;
   
    // Recalculate totalCartPrice
    cart.totalCartPrice = cart.products.reduce(
      (total, product) => total + product.totalProductPrice,
      0 
    );
    await cart.save();
    cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price brand image_url");
    return res.status(200).json({message: "Quantity increased",data: cart });
  } else {
    throw new CustomError("Product not found in cart", 404);
  }
});


const decreaseQuantity = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId, size } = req.body;
  let cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new CustomError("Cart not found",404);     }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.equals(productId) && p.size == size
    );

    if (productIndex !== -1) {
      const product = cart.products[productIndex];

      if (product.quantity > 1) {
        product.quantity -= 1;
        product.totalProductPrice = product.quantity * product.price;
        cart.totalCartPrice = cart.products.reduce(
          (total, product) => total + product.totalProductPrice,
          0
        );

        await cart.save();
        cart = await Cart.findOne({ userId }).populate(
          "products.productId",
          "name price brand image_url");
        return res.status(200).json({ message: 'Quantity decreased',data: cart });
      } else {
        throw new CustomError('Quantity cannot be less than 1',400);
      }
    } else {
      throw new CustomError("Product not found in cart", 404);
    }
});


// viewing the total price of products in the cart
const cartTotal = asyncErrorHandler( async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId }).populate("products.productId");

  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  let totalPrice = 0;
  cart.products.forEach((item) => {
    totalPrice += item.productId.price * item.quantity;
  });

  generateResponse(res,200,"total price calculated", { totalPrice });
});


// Get the total products in the cart
const totalProducts = asyncErrorHandler(async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found" , 404);
  }
  const totalItems = cart.products.length;
  generateResponse(res,200,"total items in cart",{ totalItems });
});


// Clear the cart
const clearCart = asyncErrorHandler( async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  // Clear all products in the cart
  cart.products = [];
  await cart.save();
  generateResponse(res, 200, "Cart cleared", {cart });
});

module.exports = {
  addToCart,
  viewCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
  totalProducts,
  clearCart,
};
