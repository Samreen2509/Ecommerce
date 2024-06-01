import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/logout`,
        null,
        {
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

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const userInfo = error.response?.data?.userInfo || null;
      return rejectWithValue({ message, userInfo });
    }
  }
);
export const Register = createAsyncThunk(
  'auth/register',
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/register`,
        {
          name,
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const userInfo = error.response?.data?.userInfo || null;
      return rejectWithValue({ message, userInfo });
    }
  }
);

const initialState = {
  isLoading: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  error: null,
  isUserVerified: JSON.parse(localStorage.getItem('isUserVerified')) || null,
  isUserLogin: JSON.parse(localStorage.getItem('isUserLogin')) || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoading = false;
        state.isUserLogin = true;

        console.log(action.payload.data.userInfo.isEmailVerified);
        state.isUserVerified = action.payload.data.userInfo.isEmailVerified;

        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        localStorage.setItem('isUserLogin', JSON.stringify(true));
        localStorage.setItem('isUserVerified', JSON.stringify(true));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUserLogin = true;
        state.userInfo = action.payload;
      })
      .addCase(Register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isUserLogin = false;
        state.error = null;
        state.userInfo = null;
        state.isUserVerified = null;
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isUserVerified');
        localStorage.removeItem('isUserLogin');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
