import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user'
import documentReducer from './features/document'
import { userApi } from './features/userAPI'


export const store = configureStore({
    reducer: {
        document: documentReducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})