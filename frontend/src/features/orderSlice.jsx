import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import endpoints from "../api/endpoints";


// Async thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ userId, shippingAddress }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoints.ORDERS.CREATE(userId), {
        shippingAddress,
      });
      console.log("res checkout",response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);

// Async thunk to fetch user orders
export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoints.ORDERS.GET_USER_ORDERS(userId));
      return response.data.data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    // Place order reducers
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch user orders reducers
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
