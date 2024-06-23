import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.BASEURL;

export const createNewOrder = createAsyncThunk(
  'order/createNewOrder',
  async ({ data, userId }, { rejectWithValue }) => {
    console.log({ data });
    try {
      const response = await axios.post(`${BASE_URL}/order/${userId}`, data, {
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

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async ({ userId }, { rejectWithValue }) => {
    console.log(userId);
    try {
      const response = await axios.get(
        `${BASE_URL}/order/${userId}`,

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

export const createAddressId = createAsyncThunk(
  'order/createAddressId',
  async ({ addressData, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/address/${userId}`,
        addressData,
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

export const getAddress = createAsyncThunk(
  'order/getAddress',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/address/${userId}`,

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

const initialState = {
  order: [],
  loading: false,
  error: null,
  items: [],
  paymentUrl: null,
  orderInfoAfterPayment: [],
  addresses: [],
  selectaddress: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getSelectAddress: (state, action) => {
      state.selectaddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      console.log(action.payload);
      state.paymentUrl = action.payload.data.paymentInfo;
      state.orderInfoAfterPayment = action.payload.data.orderInfo;
    });
    builder.addCase(createNewOrder.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(createAddressId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAddressId.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAddressId.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getAddress.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      // state.addressId = action.payload.data.addressInfo.map((e) => e._id);
      state.addresses = action.payload.data.addressInfo;
    });
    builder.addCase(getAddress.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      console.log(action.payload);
      state.order = action.payload.data.orderInfo;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const { getSelectAddress } = orderSlice.actions;
export default orderSlice.reducer;
