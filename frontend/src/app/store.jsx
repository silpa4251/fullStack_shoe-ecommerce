import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/wishlistSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
