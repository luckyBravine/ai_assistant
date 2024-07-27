import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {API_URL} from '../config/index'


export const register = createAsyncThunk('users/register', async({ username, email, password }, thunkAPI) => {
  const body = JSON.stringify({
    username, email, password
  })

  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      },
      body
    })
    
    const data = await res.json();

    if(res.status === 200 || res.status === 201){
      return {
        data,
        message: data.message || "User created successfully!",
      };

    }else{
      console.log(res)
      return thunkAPI.rejectWithValue({ message: res.statusText || 'error' })
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({ message: error.res.status || "An error occurred" })
  }
})

export const initialState = { 
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  message: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: state => {
        state.registered = false
    }
  },
  extraReducers: builder => {
    builder
    .addCase(register.pending, state =>{
      state.loading =true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true
      state.message = action.payload.message;
    })
    .addCase(register.rejected, (state, action) =>{
      state.loading = false
      state.message = action.payload.message;
    })
  }
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer