import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/refreshToken`,
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

export const User = createAsyncThunk(
  'auth/User',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.BASEURL}/auth/user`, {
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/logout`,
        {},
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
  async ({ loginData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/login`,
        loginData,
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

export const forgotPasswordLink = createAsyncThunk(
  'auth/forgotPasswordLink',
  async ({ forgotData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/auth/forgotPassword`,
        forgotData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue({ message, userInfo });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ resetData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.BASEURL}/auth/forgotPassword`,
        resetData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue({ message, userInfo });
    }
  }
);

const initialState = {
  isLoading: false,
  userInfo: null,
  userData: null,
  error: null,
  isUserVerified: null,
  isUserLogin: false,
  refreshToken: null,
  token: null,
  success: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // forgot Passwoard Link
      .addCase(forgotPasswordLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(forgotPasswordLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.data.userInfo;
        state.userData = action.payload.data.userInfo;
        state.error = null;
        state.isLoading = false;
        state.isUserLogin = true;
        state.isUserVerified = action.payload.data.userInfo.isEmailVerified;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // register new user
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isUserVerified = false;
      })
      .addCase(Register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // logout user
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isUserLogin = false;
        state.userInfo = null;
        state.isUserVerified = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isUserLogin = false;
        state.userInfo = null;
        state.isUserVerified = null;
        state.userData = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(refreshToken.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.error = action?.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.refreshToken = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.refreshToken = null;
        state.isLoading = false;
        state.error = action?.payload;
      })

      .addCase(User.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(User.fulfilled, (state, action) => {
        state.userData = action.payload.data.userInfo;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(User.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
