import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config/index";

export const register = createAsyncThunk(
  "users/register",
  async ({ username, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      username,
      email,
      password,
    });

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200 || res.status === 201) {
        return {
          user: data.user,
          token: data.token,
          sucessMessage: data.sucessMessage || "User created successfully!",
          // e || "User created successfully!"
        };
      } else {
        console.log(res);
        return thunkAPI.rejectWithValue({
          errorMessage: res.statusText || "error",
        });
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        errorMessage: error.res.status || "An error occurred",
      });
    }
  }
);

 

// a helper function to get token from getState
const tokenConfig = (getState) => {
  //get the token from the state
  const token = getState().user.token;
  

  console.log('Token from state:', token); // Debugging line

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //if token, add header
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const getUser = createAsyncThunk("users/getUser", async (_, thunkAPI) => {
  const config = tokenConfig(thunkAPI.getState);
  console.log('Config for getUser:', config);
  try {
    const res = await fetch(`${API_URL}/api/auth/user`, {
      method: "GET",
      headers: config.headers,
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue({
        errorMessage: data.errorMessage || "User Not Found",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: error.res.errorMessage || "User Does Not Exist",
    });
  }
});

export const login = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    const body = JSON.stringify({
      username,
      password,
    });

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;

        dispatch(getUser());

        return {
          user: data.user,
          token: data.token,
          sucessMessage: data.sucessMessage || "User logged in successfully!",
        };
      } else {
        return thunkAPI.rejectWithValue({
          errorMessage: data.errorMessage || "Password or Username is wrong",
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errorMessage: err.res.errorMessage || "User does not exist",
      });
    }
  }
);
export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  const config = tokenConfig(thunkAPI.getState);
  try {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: config.headers,
    });

    const data = await res.json();

    if (res.status === 200 || res.status === 204) {
      return {
        sucessMessage: data.sucessMessage || "User logged out successfully!",
      };
    } else {
      return thunkAPI.rejectWithValue({
        errorMessage: data.errorMessage || "Error in logging out",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: error.res.errorMessage || "Error in accessing the logout",
    });
  }
});

export const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  registered: false,
  errorMessage: "",
  sucessMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.registered = true;
        state.user = payload.user;
        state.sucessMessage = payload.sucessMessage;
        state.token = payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.sucessMessage = payload.sucessMessage;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.user = payload.user;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, {payload}) => {
        state.user = payload;
        state.loading = false;
        state.sucessMessage = payload.sucessMessage;
        state.user = null;
        state.token = null;
        state.isAuthenticated = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage;
      });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
