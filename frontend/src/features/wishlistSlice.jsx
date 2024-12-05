import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import endpoints from '../api/endpoints';
import { toast } from 'react-toastify';


// Fetch the wishlist for a specific user
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoints.WISHLIST.GET_WISHLIST(userId));
      return response.data.data.wishlist.products;
    } catch (error) {
      toast.error('Failed to fetch wishlist', {
        toastId: 'cartFetchError',
        position: 'top-center',
        autoClose: 2000,
      });
      return rejectWithValue(error.response?.data || 'Failed to fetch wishlist');
    }
  }
);

// Add or remove a product from the wishlist
export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleWishlistItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoints.WISHLIST.ADD_TO_WISHLIST(userId),
    {productId}
    );
    console.log("wishlist",response.data.data);
      return response.data.data.wishlist.products;
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
      const response = await axiosInstance.delete(endpoints.WISHLIST.REMOVE_FROM_WISHLIST(userId), { productId });
      return response.data.data.wishlist.products;
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
      const response = await axiosInstance.post(endpoints.WISHLIST.ADD_FROM_WISHLIST(userId), { productId });
      return response.data.data.wishlist.products;
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
      const response = await axiosInstance.delete(endpoints.WISHLIST.CLEAR_WISHLIST(userId));
      return response.data.data.wishlist.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to clear wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [], // Tracks the wishlist products
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(removeFromWishlist.pending, (state, action) => {
        const removedProductId = action.meta.arg.productId;
        state.wishlist = state.wishlist.filter((item) => item.productId._id !== removedProductId);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const removedProductId = action.meta.arg.productId; // Extract the removed product ID from the arguments
        state.wishlist = state.wishlist.filter((item) => item.productId._id !== removedProductId);
      })
      
      .addCase(removeFromWishlist.rejected, (state, action) => {
        // Optionally, reload the wishlist from the server if the removal fails
        state.error = action.payload || 'Failed to remove product from wishlist';
      })
      .addCase(moveToCartFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToCartFromWishlist.fulfilled, (state) => {
        state.loading = false;
        // No updates to wishlist; backend handles cart updates
      })
      .addCase(moveToCartFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
