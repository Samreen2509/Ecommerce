import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;

export const getAllNotification = createAsyncThunk(
  'notification/getAllNotification',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/notification`, {
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

export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/notification/${id}`, {
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
  notification: [],
  SuccessMsg: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  extraReducers: (builder) => {
    builder
      // get all notification
      .addCase(getAllNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.notification = action.payload.data.notificationInfo;
      })
      .addCase(getAllNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
