import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../redux/weatherSlice.jsx';
import MapSelection from "../components/MapSelection.jsx";

const WeatherDisplay = () => {

    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weather.data);
    const weatherStatus = useSelector((state) => state.weather.status);
    const weatherError = useSelector((state) => state.weather.error);
    const weather  = useSelector((state) => state.weather);

    console.log(weatherData);
    console.log(weatherStatus);

    const lat = 40.766666;
    const lon = 29.916668;
    const apiKey = weather.apiKey;

    // Bileşen ilk yüklendiğinde hava durumu verisini çek
    useEffect(() => {
        if (weatherStatus === 'idle') {
            dispatch(fetchWeatherData({ lat, lon, apiKey }));
        }
    }, [dispatch, weatherStatus, lat, lon]);


    if (weatherStatus === 'loading') {
        return <p>Hava durumu bilgileri yükleniyor...</p>;
    }

    if (weatherStatus === 'failed') {
        return <p>Hata: {weatherError}</p>;
    }

    return (
        <div>
            <div>
                <MapSelection/>
            </div>
            {weatherData ? (
                <>
                    <h2>{weatherData.name} Hava Durumu</h2>
                    <p>Sıcaklık: {Math.round(weatherData.main.temp - 273.15)}°C</p> {/* Kelvin'i Celsius'a çevirdik */}
                    <p>Hava Durumu: {weatherData.weather[0].description} -- {weatherData.weather[0].main}</p>
                </>
            ) : (
                <p>Veri bulunamadı</p>
            )}
        </div>
    );
};

export default WeatherDisplay;
