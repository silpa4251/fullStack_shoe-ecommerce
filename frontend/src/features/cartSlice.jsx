import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import endpoints from '../api/endpoints';
import axiosInstance from '../api/axiosInstance';


export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, size, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.CART.ADD_TO_CART(userId),
        { productId, size, quantity }
      );

      const updatedCart = response.data.data.cart;
      // const addedProduct = updatedCart.products.find(
      //   (item) => item.productId === productId
      // );

      return updatedCart;
    } catch (error) {
      toast.error('Failed to add product to cart',{position: 'top-center', toastId: 'addcart', autoClose: 1000});
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId , size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/${userId}/remove/${productId}/${size}`);
      toast.success('Product removed from cart', {
        toastId: 'cartRemoved',
        position: 'top-center',
        autoClose: 2000,
      });
      return response.data.data.products;
    } catch (error) {
      toast.error('Failed to remove product from cart', {
        toastId: 'cartRemoveError',
        position: 'top-center',
        autoClose: 2000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);


export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/cart/${userId}/increase`, { userId, productId, size });
      return response.data.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/cart/${userId}/decrease`, {
        productId, size
      });
      return response.data.data.products; 
    } catch (error) {
      toast.error('Failed to decrease quantity',{position: 'top-center'});
      return rejectWithValue(error.response.data);
    }
  }
);


export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(endpoints.CART.CLEAR_CART(userId));
      toast.success('Cart cleared', {
        toastId: 'cartCleared',
        position: 'top-center',
        autoClose: 2000,
      });
      return response.data.cart;
    } catch (error) {
      toast.error('Failed to clear cart', {
        toastId: 'cartClearError',
        position: 'top-center',
        autoClose: 2000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoints.CART.GET_CART(userId));
      return response.data.data.cart.products;
    } catch (error) {
      toast.error('Failed to fetch cart', {
        toastId: 'cartFetchError',
        position: 'top-center',
        autoClose: 2000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cart: [],
  status: 'idle', 
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(increaseQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; 
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(decreaseQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; 
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = 'succeeded';
        state.cart = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
