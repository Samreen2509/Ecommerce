import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.BASEURL;

export const getProducts = createAsyncThunk(
  'dashboard/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/product`, {
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

export const addProduct = createAsyncThunk(
  'dashboard/addProduct',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/product`, {
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

export const updateProduct = createAsyncThunk(
  'dashboard/updateProduct',
  async ({ productData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/product/${id}`,
        {
          name: productData.name,
          description: productData.description,
          size: productData.size.join(','), // Convert size array to comma-separated string
          price: productData.price,
          stock: productData.stock,
          mainImage: {
            url: productData.mainImage.url,
            public_id: productData.mainImage.public_id,
            secure_url: productData.mainImage.secure_url,
            width: productData.mainImage.width,
            height: productData.mainImage.height,
            format: productData.mainImage.format,
            _id: productData.mainImage._id,
          },
          mainImageName: productData.mainImageName,
          category: productData.category,
          color: productData.color,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getCategory = createAsyncThunk(
  'dashboard/getCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/category`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getColors = createAsyncThunk(
  'dashboard/getColors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/color`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  colors: [],
  categories: [],
  SuccessMsg: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload.data.productInfo;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.SuccessMsg = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.SuccessMsg = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.products = action.payload.data.productInfo;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.colors = action.payload.colorInfo;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
