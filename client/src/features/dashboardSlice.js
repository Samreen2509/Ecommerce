import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;

export const getItemsCount = createAsyncThunk(
  'dashboard/getItemsCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard/count-items`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  itemCounts: [],
  SuccessMsg: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getItemsCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItemsCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.itemCounts = Object.entries(action.payload.data);
      })
      .addCase(getItemsCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
