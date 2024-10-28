import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setApiKey } from '../redux/weatherSlice.jsx';

const APIKeyPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather);

    // Sayfa yüklendiğinde, sessionStorage'da API Key olup olmadığını kontrol et
    useEffect(() => {
        const storedApiKey = sessionStorage.getItem('weatherApiKey');
        if (storedApiKey) {
            navigate('/citiesSelection');
        }
    }, [navigate]);

    const validateApiKey = async (key) => {
        const lat = 41.0082; // Test için sabit bir konum kullanılıyor (İstanbul)
        const lon = 28.9784;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            );
            const data = await response.json();

            // Eğer "cod" 401 ise, API Key geçersizdir
            if (data.cod === 401) {
                return false;
            }

            return true;
        } catch (err) {
            console.error('API isteği sırasında hata oluştu:', err);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (weather.apiKey.trim() === '') {
            setError('Lütfen geçerli bir API Key girin.');
            setLoading(false);
            return;
        }

        // API Key doğrulama işlemi
        const isValidKey = await validateApiKey(weather.apiKey);

        if (!isValidKey) {
            setError('Geçersiz API Key. Lütfen doğru bir API Key girin.');
            setLoading(false);
            return;
        }

        // Geçerli API Key ise, sessionStorage'a kaydet ve yönlendir
        sessionStorage.setItem('weatherApiKey', weather.apiKey);
        navigate('/citiesSelection');
    };

    return (
        <div className="flex flex-col items-center justify-around h-dvh">
            <div>
                <h2 className="text-2xl my-6">API Key Girin</h2>
                <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                    <input
                        className="py-2 px-4 border-2 border-gray-800 rounded-md"
                        type="text"
                        placeholder="API Key"
                        value={weather.apiKey}
                        onChange={(e) => dispatch(setApiKey(e.target.value))}
                    />
                    <button type="submit" disabled={loading} className="border-2 border-gray-800">
                        {loading ? 'Kontrol ediliyor...' : 'Gönder'}
                    </button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            </div>
            <p className="text-lg ">My Key: <span
                className="bg-black p-2 border-2 border-gray-800 rounded-md">fe5415e6fcb64e98caf1a33cd665eac3</span></p>
        </div>
    );
};

export default APIKeyPage;
