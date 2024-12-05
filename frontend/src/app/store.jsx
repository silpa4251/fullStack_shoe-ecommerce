import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/wishlistSlice";
import profileReducer from "../features/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
  },
});

export default store;
