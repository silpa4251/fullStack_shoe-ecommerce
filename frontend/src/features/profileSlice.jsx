import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile/${userId}`);
      console.log("profile",response.data.data.profile);
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
      const response = await axiosInstance.put(
        `/profile/${userId}`,
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
    setProfile: (state, action) => {
      state.profile = action.payload; 
    },

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



export const { setProfile} = profileSlice.actions;
export default profileSlice.reducer;
