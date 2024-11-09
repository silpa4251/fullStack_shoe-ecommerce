const Product= require("../models/productModel")
const getProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch ( error) {
        res.status(500).json({ message : "server error", error: error.message});
    }
}

const getProductsById = async (req,res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" }); 
          }
        res.status(200).json(product);
    } catch ( error) {
        res.status(500).json({ message : "server error", error: error.message});
    }
}

const getProductsByCategory = async (req,res) =>{
    try{
        const { categoryname } = req.params; 
        if (!categoryname) {
            return res.status(400).json({ message: "Category parameter is missing" });
        }
        const products = await Product.find({ category: categoryname});
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const searchProducts = async (req,res) => {
    try{
        const { keyword } = req.query;
        if ( !keyword ) {
            return res.status(400).json({ message: "Search keyword is missing" });
        }
        const products = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching the search" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

module.exports = { getProducts , getProductsById, getProductsByCategory, searchProducts}