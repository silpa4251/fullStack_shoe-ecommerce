const products = require("../models/productModel")
const getProducts = async (req,res) => {
    try{
        const Products = await products.find({});
        res.send(200).json(Products);
    } catch ( error) {
        res.status(500).json({ message : "server error", error: error.message});
    }
}

const getProductsById = async (req,res) => {
    try{
        const productId = req.params.id;
        const Product = await products.findById(productId);
        if (!Product) {
            return res.status(404).json({ message: "Product not found" }); 
          }
        res.send(200).json(Product);
    } catch ( error) {
        res.status(500).json({ message : "server error", error: error.message});
    }
}

const getProductsByCategory = async (req,res) =>{
    try{
        const { category } = req.query; 
        const filter = category ? { category } : {};
        const Products = await products.find(filter);
        if (Products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { getProducts , getProductsById, getProductsByCategory}