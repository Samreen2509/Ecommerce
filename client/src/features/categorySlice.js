import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL_CATEGORY = `${process.env.BASEURL}/category`;

// creating a category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL_CATEGORY, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// getting all the category
export const getAllCategory = createAsyncThunk(
  'category/getAllCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL_CATEGORY, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// getting a single category
export const getOneCategory = createAsyncThunk(
  'category/getOneCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_CATEGORY}/${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// updating a category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ data, categoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_CATEGORY}/${categoryId}`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// deleting a category
export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL_CATEGORY}/${categoryId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return id; // Return the id of the deleted product
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  categories: [],
  categorie: null,
  loading: false,
  error: null,
};

// Create the category slice
export const catgorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories.push(action.payload); // Append the new category to the list
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      //Get all category
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload; // // Set the category list
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      //Get one category
      .addCase(getOneCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.categorie = action.payload; // // Set the single  category list
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.map((categorie) =>
          categorie.id === action.payload.id ? action.payload : categorie
        ); // Update the product in the list
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      // Delete category
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.filter(
          (categorie) => categorie.id !== action.payload
        ); // Remove the product from the list
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default catgorySlice.reducer;
