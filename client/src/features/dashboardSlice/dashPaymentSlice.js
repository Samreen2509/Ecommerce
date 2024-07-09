import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;

export const addPayment = createAsyncThunk(
  'dashPayment/addPayment',
  async ({ userId, paymentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/payment/${userId}/${paymentId}`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getSinglePayment = createAsyncThunk(
  'dashPayment/getSinglePayment',
  async ({ userId, paymentId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/payment/${userId}/${paymentId}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getAllPayments = createAsyncThunk(
  'dashPayment/getAllPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment`, {
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
  payments: [],
  singlePayment: [],
  SuccessMsg: null,
};

export const dashPaymentSlice = createSlice({
  name: 'dashUser',
  initialState,
  extraReducers: (builder) => {
    builder
      // add payment
      .addCase(addPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get single payment
      .addCase(getSinglePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSinglePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singlePayment = action.payload.data.paymentInfo;
      })
      .addCase(getSinglePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // update all payments
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.payments = action.payload.data.paymentInfo;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashPaymentSlice.reducer;
