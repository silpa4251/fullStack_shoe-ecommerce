import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import endpoints from '../api/endpoints';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axiosInstance.get("/products");
  console.log('Products fetched:', response.data);
  return response.data;
});

// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeaturedProducts', async () => {
    const response = await axiosInstance.get("/products/featured");
    return response.data;
});
  
// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (categoryname) => {
    const response = await axiosInstance.get(endpoints.PRODUCTS.GET_CATEGORY(categoryname));
    return response.data;
});
  
// Search products by keyword
export const searchProducts = createAsyncThunk('products/searchProducts', async (keyword) => {
    const response = await axiosInstance.get(endpoints.PRODUCTS.SEARCH(keyword));
    return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });

    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        console.log('Action Payload:', action.payload); 
        state.status = 'succeeded';
        state.featuredProducts = action.payload.data.products;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });

    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data.products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });

    builder
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data.products;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });
    },
});

export const selectProducts = (state) => state.products?.products || [];
export const selectFeaturedProducts = (state) => state.products?.featuredProducts || [];
export const selectProductById = (id) => (state) =>
  state.products.products.find((product) => product._id === id);

export default productSlice.reducer;
