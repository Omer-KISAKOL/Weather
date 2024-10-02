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
    },
    reducers: {
        setApiKey: (state, action) => {
            state.apiKey = action.payload; // Redux state'ini güncelle
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

export const { setApiKey } = weatherSlice.actions;
export default weatherSlice.reducer;
