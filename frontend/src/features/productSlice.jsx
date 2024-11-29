import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import endpoints from '../api/endpoints';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const cachedProducts = localStorage.getItem('products');
  const cacheTimestamp = localStorage.getItem('productsCacheTimestamp');
  const cacheDuration = 10 * 60 * 1000;

  if (cachedProducts && cacheTimestamp && Date.now() - cacheTimestamp < cacheDuration) {
    return JSON.parse(cachedProducts);
  }

  const response = await axiosInstance.get(endpoints.PRODUCTS.GET_ALL);
  console.log("API Response:", response.data);
  localStorage.setItem('products', JSON.stringify(response.data));
  localStorage.setItem('productsCacheTimestamp', Date.now());
  return response.data;
});

// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeaturedProducts', async () => {
  const response = await axiosInstance.get('/products/featured');
  return response.data;
});

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (categoryname) => {
  const response = await axiosInstance.get(endpoints.PRODUCTS.GET_CATEGORY(categoryname));
  return response.data;
});

// Fetch products by id
export const fetchProductById = createAsyncThunk('products/productById', async (id) => {
  const response = await axiosInstance.get(endpoints.PRODUCTS.GET_SINGLE(id));
  console.log("API Response for Product:", response.data.product);

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
    featuredProducts: [],
    productByCategory: [],
    productById:[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data.products; // Adjust based on API response
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch featured products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.featuredProducts = action.payload.data.products; // Adjust if necessary
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsByCategory = action.payload.data.products; // Adjust if necessary
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch products by id
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productById = action.payload.data.product; // Adjust if necessary
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data.product; // Adjust if necessary
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectProductsByCategory = (state) => state.products.productsByCategory;
export const selectFeaturedProducts = (state) => state.products.featuredProducts;
export const selectProductById = (state) => state.products.productById;


export default productSlice.reducer;
