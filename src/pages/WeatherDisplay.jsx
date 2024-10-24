import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData , setCityName} from '../redux/weatherSlice.jsx';
import citiesData from '../data/cities.json'
import {convertUnixToTime} from "../utils/time.js";

const WeatherDisplay = () => {

    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weather.data);
    const weatherStatus = useSelector((state) => state.weather.status);
    const weatherError = useSelector((state) => state.weather.error);
    const weather  = useSelector((state) => state.weather);

    console.log(weatherData);
    console.log(weatherStatus);

    const apiKey = weather.apiKey;

    // Bileşen ilk yüklendiğinde hava durumu verisini çek
    useEffect(() => {
        const city = citiesData.find(c => c.name === weather.cityName);
        const { latitude, longitude } = city;
        // console.log(`Lat: ${latitude}, Lon: ${longitude}`);
        if (city) {
            if (latitude && longitude) {
                dispatch(fetchWeatherData({ lat: latitude, lon: longitude, apiKey }));
            }
        } else {
            console.log('City not found');
        }
    }, [weather.cityName]);


    if (weatherStatus === 'loading') {
        return <p>Hava durumu bilgileri yükleniyor...</p>;
    }

    if (weatherStatus === 'failed') {
        return <p>Hata: {weatherError}</p>;
    }

    const handleCityChange = (e) => {
        dispatch(setCityName(e.target.value));
    };

    return (
        <div className="relative">

            <div className="absolute right-32 inset-y-10">
                <select
                    id="city"
                    value={weather.cityName}
                    onChange={handleCityChange}
                    className="w-full p-2 border-2 border-gray-500 rounded-md"
                >
                    <option value="" disabled>Select a city</option>
                    {citiesData.map((city) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            {weatherData ? (
                <div className="flex flex-col items-center justify-center h-dvh">

                    <div className="flex flex-col items-center bg-blue-50 text-black p-6 rounded-lg shadow-md w-96">
                        {/* City and Temperature */}
                        <div className="flex justify-between w-full mb-8">

                            <div>
                                <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
                                <p className="text-xl font-semibold">
                                    {Math.round(weatherData.main.temp - 273.15)}°C
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-medium uppercase">{weatherData.weather[0].description}</p>
                                <div className="text-gray-900">
                                    <p>Wind: {weatherData.wind.speed} m/s</p>
                                    <p>Humidity: {weatherData.main.humidity}%</p>
                                </div>
                            </div>

                        </div>

                        {/* Sunrise and Sunset */}
                        <div className="flex justify-between w-full text-gray-900 mt-2">

                            <div className="flex flex-col items-center">
                                <p>🌅 Sunrise</p>
                                <p>{convertUnixToTime(weatherData.sys.sunrise)}</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <p>🌇 Sunset</p>
                                <p>{convertUnixToTime(weatherData.sys.sunset)}</p>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center bg-blue-50 text-black p-6 rounded-lg shadow-md w-96">Veri bulunamadı</div>
            )}
        </div>
    );
};

export default WeatherDisplay;
