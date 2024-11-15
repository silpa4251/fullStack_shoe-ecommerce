const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const profileRoutes = require("./routes/profileRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/orders", orderRoutes);

app.all("*",(req,res,next) => {
    const error = new customError(`Cannot find ${req.originalUrl} on this server!`,404);
    next(error);
})

app.use(errorHandler);

module.exports = app;
