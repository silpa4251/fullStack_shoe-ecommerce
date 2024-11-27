import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000"; // Your backend URL

// Fetch the wishlist for a specific user
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/wishlist`);
      return response.data.wishlist.products; // Assuming `products` is returned as part of the wishlist
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch wishlist');
    }
  }
);

// Add or remove a product from the wishlist
export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleWishlistItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/${userId}/wishlist`, { productId });
      return response.data.wishlist.products; // Return updated wishlist
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update wishlist');
    }
  }
);

// Remove a specific product from the wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}/wishlist`, { data: { productId } });
      return response.data.wishlist.products; // Return updated wishlist
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove product from wishlist');
    }
  }
);

// Move a product from the wishlist to the cart
export const moveToCartFromWishlist = createAsyncThunk(
  'wishlist/moveToCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/${userId}/wishlist/move-to-cart`, { productId });
      return response.data.cart; // Return updated cart
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to move product to cart');
    }
  }
);

// Clear the wishlist
export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}/wishlist/clear`);
      return []; // Wishlist is cleared, return empty array
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to clear wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Wishlist Item
      .addCase(toggleWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Move to Cart from Wishlist
      .addCase(moveToCartFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToCartFromWishlist.fulfilled, (state) => {
        state.loading = false;
        // No need to modify the wishlist state here; the cart is updated in the backend
      })
      .addCase(moveToCartFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear Wishlist
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;
        state.wishlist = [];
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
