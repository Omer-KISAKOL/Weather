export const fetchWeather = async (lat, lon) => {
    const apiKey = sessionStorage.getItem('weatherApiKey');
    if (!apiKey) {
        throw new Error('API Key bulunamadı');
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (!response.ok) {
            // Eğer yanıt başarılı değilse, hata fırlat
            const errorData = await response.json();
            throw new Error(errorData.message || 'API isteği başarısız oldu.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Hata durumunu yakala ve uygun mesajı döndür
        console.error('Hata oluştu:', error);
        throw new Error('Hava durumu verilerini alırken bir hata oluştu: ' + error.message);
    }
};
