export const convertUnixToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Saniyeyi milisaniyeye çevir
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`; // Saat ve dakikayı döndür
};