import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;

export const addColor = createAsyncThunk(
  'dashColor/addColor',
  async ({ colorData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/color`, colorData, {
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

export const updateColor = createAsyncThunk(
  'dashColor/updateColor',
  async ({ id, colorData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/color/${id}`, colorData, {
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

export const deleteColor = createAsyncThunk(
  'dashColor/deleteColor',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/color/${id}`, {
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

export const getSingleColor = createAsyncThunk(
  'dashColor/getSingleColor',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/color/${id}`, {
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

export const getAllColor = createAsyncThunk(
  'dashColor/getAllColor',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/color`, {
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
  colors: [],
  singleColor: [],
  SuccessMsg: null,
};

export const dashColorSlice = createSlice({
  name: 'dashColor',
  initialState,
  extraReducers: (builder) => {
    builder
      // add Color
      .addCase(addColor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // update color
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.updateColor = action.payload.data.colorInfo;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // delete color
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get single color
      .addCase(getSingleColor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singleColor = action.payload.data.colorInfo;
      })
      .addCase(getSingleColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get all colors
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.colors = action.payload.data.colorInfo;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashColorSlice.reducer;
