import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice.jsx'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    }
})