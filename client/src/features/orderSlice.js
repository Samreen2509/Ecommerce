import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.BASEURL;

export const createNewOrder = createAsyncThunk(
  'order/createNewOrder',
  async ({ data, userId }, { rejectWithValue }) => {
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

export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order`,

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

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderData, userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/order/${userId}/${orderId}`,
        { orderData },
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
  allOrders: [],
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
    //create new order
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      state.paymentUrl = action.payload.data.paymentInfo;
      state.orderInfoAfterPayment = action.payload.data.orderInfo;
    });
    builder.addCase(createNewOrder.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // create addresss
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

    // get address
    builder.addCase(getAddress.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      state.addresses = action.payload.data.addressInfo;
    });
    builder.addCase(getAddress.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // get user's all order
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      state.order = action.payload.data.orderInfo;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // get all order
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      state.allOrders = action.payload.data.orderInfo;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // update Order
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const { getSelectAddress } = orderSlice.actions;
export default orderSlice.reducer;
