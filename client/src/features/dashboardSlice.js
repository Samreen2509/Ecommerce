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

export const getSingleProducts = createAsyncThunk(
  'dashboard/getSingleProducts',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/${id}`, {
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
  async ({ productData }, { rejectWithValue }) => {
    console.log(productData);
    try {
      const response = await axios.post(`${BASE_URL}/product`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'dashboard/deleteProduct',
  async ({ id }, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
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
      console.log(response.data);
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
      return response.data;
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

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const addOtherImages = createAsyncThunk(
  'dashboard/addOtherImages',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/product/otherImages/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
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

export const deleteOtherImages = createAsyncThunk(
  'dashboard/deleteOtherImages',
  async ({ id, imageId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/product/otherImages/${id}/${imageId}`,
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
  itemCounts: [],
  products: [],
  colors: [],
  singleProduct: [],
  categories: [],
  SuccessMsg: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteOtherImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOtherImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOtherImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addOtherImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOtherImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addOtherImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

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
      })
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
      .addCase(getSingleProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singleProduct = action.payload.data.productInfo;
      })
      .addCase(getSingleProducts.rejected, (state, action) => {
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
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.SuccessMsg = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.SuccessMsg = action.payload.data;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
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
        state.categories = action.payload.data.categoryInfo;
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
        state.colors = action.payload.data.colorInfo;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
