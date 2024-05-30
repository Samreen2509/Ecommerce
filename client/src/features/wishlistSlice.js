import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;

export const getWishListProducts = createAsyncThunk(
  'wishlist/getWishListProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/wishlist/getuserwishlist`, {
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

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/wishlist/addtowishlist?productId=${productId}`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/wishlist/removefromwishlist?productId=${_id}`,
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
  wishlistProducts: [],
  totalWishProducts: 0,
  totalWishProductsId: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.totalWishProductsId = action.payload.data.items.map(
          (item) => item.productId
        );
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getWishListProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWishListProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.wishlistProducts = action.payload.data.items;
        state.totalWishProducts = action.payload.data.items.length;
        state.totalWishProductsId = action.payload.data.items.map(
          (item) => item.product._id
        );
      })
      .addCase(getWishListProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.wishlistProducts = action.payload.data.items;
        // state.totalWishProducts = action.payload.data.items.length;
        // console.log(action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
