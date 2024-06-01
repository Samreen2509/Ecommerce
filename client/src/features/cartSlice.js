import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.BASE_URL

export const getCartProducts = createAsyncThunk(
    'cart/getCartProducts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/cart`, {
          headers: {
          },
            'Content-Type': 'application/json',
        });
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return rejectWithValue(message);
      }
    }
  );


const initialState = {
    isLoading: 'idle',
    error: null,
    cartPorducts: null,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder
           .addCase(getCartProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
           .addCase(getCartProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartPorducts = action.payload;
            })
           .addCase(getCartProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default cartSlice.reducer;