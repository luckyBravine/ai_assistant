import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  registered: false,
  errorMessage: "",
  successMessage: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.successMessage = action.payload.successMessage;
    },
    registerUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.successMessage = action.payload.successMessage;
      state.registered = true;
    },
    clearUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.successMessage = action.payload
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { resetRegistered, setUser, registerUser, clearUser, setError } = userSlice.actions;
export default userSlice.reducer;

