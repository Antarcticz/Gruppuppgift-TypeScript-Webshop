import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './threads/productListSlice'
// import authSlice from './features/auth/authSlice'


export const store = configureStore({
  reducer: {
    productList: productListSlice
  }
})