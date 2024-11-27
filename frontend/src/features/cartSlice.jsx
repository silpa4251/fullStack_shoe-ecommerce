import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product } = action.payload;
      const existingProductIndex = state.findIndex(
        (p) => p.id === product.id && p.size === product.size
      );

      if (existingProductIndex >= 0) {
        const existingProduct = state[existingProductIndex];
        state[existingProductIndex] = {
          ...existingProduct,
          quantity: Math.min(existingProduct.quantity + product.quantity, 20),
        };
        toast.info(`${existingProduct.name} is already in the cart. Quantity incremented!`, {
          toastId: 'cartWarning',
          position: 'top-center',
          autoClose: 2000,
        });
      } else {
        state.push(product);
        toast.success(`${product.name} added to cart`, {
          toastId: 'cartSuccess',
          position: 'top-center',
          autoClose: 2000,
        });
      }
    },
    removeFromCart(state, action) {
      return state.filter((p) => p.id !== action.payload.id || p.size !== action.payload.size);
    },
    increaseQuantity(state, action) {
      const product = state.find((p) => p.id === action.payload.id && p.size === action.payload.size);
      if (product && product.quantity < 30) {
        product.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const product = state.find((p) => p.id === action.payload.id && p.size === action.payload.size );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    setCart(state, action) {
      return action.payload;
    },
    clearCart() {
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
