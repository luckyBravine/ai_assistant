import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user'
import { userApi } from './features/userAPI'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    // devTools: process.env.NODE_ENV !== 'production'
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})