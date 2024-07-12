import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.BASEURL;

export const getCartProducts = createAsyncThunk(
  'cart/getCartProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
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

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    console.log(productId, quantity);
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/addorupdatetocart`,
        { productId, quantity },
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

export const updateToCart = createAsyncThunk(
  'cart/updateToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/addorupdatetocart`,
        { productId, quantity },
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

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/cart/removeitemfromcart/${_id}`,
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

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/cart/clearcart`,
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

const initialState = {
  isLoading: false,
  error: null,
  cartProducts: [],
  cartTotalPrice: 0,
  productTotalQty: 0,
  updateCart: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cartProducts = action.payload?.data?.items || [];
        state.cartTotalPrice = action.payload?.data?.cartTotal || 0;
        state.productTotalQty = action.payload?.data?.items?.length || 0;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cartProducts = action.payload?.items || [];
        state.productTotalQty = action.payload?.data?.items?.length || 0;
        console.log(action.payload);
        state.updateCart += 1;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Server Error';
      })
      .addCase(updateToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.updateCart += 1;
        state.cartTotalPrice = action.payload?.data?.cartTotal || 0;
      })
      .addCase(updateToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.updateCart += 1;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.updateCart += 1;
        state.cartProducts = [];
        state.cartTotalPrice = 0;
        state.productTotalQty = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
