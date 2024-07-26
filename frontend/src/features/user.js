import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {API_URL} from '../config/index'


export const initialState = { 
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
}

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

    if(res.status ===201){
      return data;
    }else{
      return thunkAPI.rejectWithValue(data)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

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
    .addCase(register.fulfilled, state => {
      state.loading = false;
      state.registered = true
    })
    .addCase(register.rejected, state =>{
      state.loading = false
    })
  }
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer