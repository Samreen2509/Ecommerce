import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;

export const addUser = createAsyncThunk(
  'dashUser/addUser',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
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

export const updateUser = createAsyncThunk(
  'dashUser/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/auth/user/${id}`,
        userData,
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

export const updateAvatar = createAsyncThunk(
  'dashUser/updateAvatar',
  async ({ id, avatarData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/updateAvatar/${id}`,
        avatarData,
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

export const getSingleUser = createAsyncThunk(
  'dashUser/getSingleUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user/${id}`, {
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

export const getAllUsers = createAsyncThunk(
  'dashUser/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/users`, {
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

export const deleteUser = createAsyncThunk(
  'dashUser/deleteUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/auth/user/${id}`, {
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
  users: [],
  singleUser: [],
  newUser: [],
  SuccessMsg: null,
};

export const dashUserSlice = createSlice({
  name: 'dashUser',
  initialState,
  extraReducers: (builder) => {
    builder
      // add User
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.newUser = action.payload.data.userInfo;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.updateUser = action.payload.data.userInfo;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // update avatar
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get single user
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singleUser = action.payload.data.userInfo;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload.data.userInfo;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get all users
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashUserSlice.reducer;
