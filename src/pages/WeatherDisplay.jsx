import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../redux/weatherSlice.jsx';
import citiesData from '../data/cities.json'

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

    return (
        <div>
            {weatherData ? (
                <>
                    <h2>{weatherData.name} Hava Durumu</h2>
                    <p>Sıcaklık: {Math.round(weatherData.main.temp - 273.15)}°C</p> {/* Kelvin'i Celsius'a çevirdik */}
                    <p>Hava Durumu: {weatherData.weather[0].description}</p>
                </>
            ) : (
                <p>Veri bulunamadı</p>
            )}
        </div>
    );
};

export default WeatherDisplay;
