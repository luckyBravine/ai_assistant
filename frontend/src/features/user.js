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
        user: data.user,
        token: data.token,
        sucessMessage: data.sucessMessage,
        // e || "User created successfully!"
      };

    }else{
      console.log(res)
      return thunkAPI.rejectWithValue({ errorMessage: res.statusText})
      // || 'error' 
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({ errorMessage: error.res.status})
    // || "An error occurred" 
  }
})

const getUser = createAsyncThunk('users/getUser', async(_, thunkAPI) =>{
  try {
    const res = await fetch(`${API_URL}/api/auth/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }

    })

    const data = await res.json();

    if(res.status === 200){
      return data
    }else{
      return thunkAPI.rejectWithValue(data)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const login = createAsyncThunk('users/login', async({ username, password }, thunkAPI) => {
  const body = JSON.stringify({
    username, password
  })
  
  // const {dispatch} = thunkAPI  
  // const state = dispatch(getUser())
  // const token = state.user.token; // Access the token from the state

  // const config = {
  //   headers: {
  //     'Content-Type' : 'application/json',
  //   },
  // }
  // if(token){
  //   config.headers['Authorization'] = `Token ${token}`
  // }

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      // config,
      body
    })
    
    const data = await res.json();
    

    if(res.status === 200 || res.status === 201){
     
      return {
        user: data.user,
        sucessMessage: data.sucessMessage,
        //  || "User logged in successfully!"
      };

    }else{
      console.log(res)
      return thunkAPI.rejectWithValue({ errorMessage: res.statusText })
      //  || 'error'
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({ errorMessage: error.res.status})
    // || "An error occurred" 
  }
})


export const initialState = { 
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  errorMessage: '',
  sucessMessage: '',
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
      state.registered = true;
      state.user = action.payload.user
      state.sucessMessage = action.payload.sucessMessage;
    })
    .addCase(register.rejected, (state, action) =>{
      state.loading = false
      state.errorMessage = action.payload.errorMessage;
    })
    .addCase(login.pending, state => {
      state.loading = true
    })
    .addCase(login.fulfilled, (state, action) =>{
      state.isAuthenticated = true;
      state.loading = false;
      state.sucessMessage = action.payload.sucessMessage
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false
      state.errorMessage = action.payload.errorMessage;
    })
    .addCase(getUser.pending, state => {
      state.loading = true
    })
    .addCase(getUser.fulfilled, (state, action) =>{
      state.user = action.payload
      state.loading = false;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false
      state.errorMessage = action.payload.errorMessage;
    })
  }
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer