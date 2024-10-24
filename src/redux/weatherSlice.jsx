import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '../utils/api';

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async ({ lat, lon, apiKey }) => {
        const data = await fetchWeather(lat, lon, apiKey);
        return data;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
        apiKey: '',
        cityName: localStorage.getItem('cityName') || '', // LocalStorage'dan cityName'i çek
    },
    reducers: {
        setApiKey: (state, action) => {
            state.apiKey = action.payload; // Redux state'ini güncelle
        },
        setCityName: (state, action) => {
            state.cityName = action.payload; // Redux state'ini güncelle
            localStorage.setItem('cityName', action.payload); // LocalStorage'a cityName'i kaydet
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setApiKey, setCityName} = weatherSlice.actions;
export default weatherSlice.reducer;
