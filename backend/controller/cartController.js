const  Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = async (req,res) => {
    try{
        const userId = req.params.id;
        const { productId, quantity} = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity }],
            });
        } else {
            const existingProduct = cart.products.findIndex((item) => item.productId.toString() === productId);
            if (existingProduct !== -1) {
                cart.products[existingProduct].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }

        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully', cart });

    } catch (error) {
        res.status(500).json({message : "Server error" , error: error.message})
    }
}

const viewCart = async (req,res) => {
    try{
        const userId = req.params.id;
        const cart = await Cart.findOne({userId}).populate("products.productId","name price brand");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ cart });
    } catch(error) {
        res.status(500).json({message : "Server error" , error: error.message})
    }
}

const removeFromCart = async (req,res) => {
   try{
    const userId = req.params.id;
    const {productId} = req.body;
    let cart = await Cart.findOne({ userId});
    if(!cart) {
        res.status(404).json({ message : "Cart not found"});
    }
    cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({message : 'Product removed from the cart'});
}  catch(error) {
    res.status(500).json({ message: "Server error", error: error.message });
}}

const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId, quantity } = req.body;
        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const existingProduct = cart.products.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingProduct=== -1) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        cart.products[existingProduct].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const cartTotal = async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ userId }).populate("products.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        let totalPrice = 0;
        cart.products.forEach((item) => {
            totalPrice += item.productId.price * item.quantity;
        });

        res.status(200).json({ totalPrice });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const totalProducts = async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const totalProducts = cart.products.length;
        res.status(200).json({ totalProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




const clearCart = async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = [];
        await cart.save();
        res.status(200).json({ message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {addToCart , viewCart , removeFromCart , updateCartQuantity, cartTotal ,totalProducts,  clearCart}