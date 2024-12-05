import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Replace with your API URL
const API_URL = 'http://localhost:5000/api';

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`);
      return response.data.data.profile;
    } catch (error) {
      toast.error('Failed to fetch profile', {
        toastId: 'profileFetchError',
        position: 'top-center',
        autoClose: 2000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit user profile
export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/profile/${userId}`,
        updatedData
      );
      toast.success('Profile updated successfully', {
        toastId: 'profileUpdateSuccess',
        position: 'top-center',
        autoClose: 2000,
      });
      return response.data.data.profile;
    } catch (error) {
      toast.error('Failed to update profile', {
        toastId: 'profileUpdateError',
        position: 'top-center',
        autoClose: 2000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add extra reducers if needed
  },
  extraReducers: (builder) => {
    // Handle fetch profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle edit profile
    builder.addCase(editProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice.reducer;
