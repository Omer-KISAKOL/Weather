import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const apiKey = sessionStorage.getItem('weatherApiKey');

    // Eğer sessionStorage'da API Key yoksa, kullanıcıyı API Key sayfasına yönlendir
    if (!apiKey) {
        return <Navigate to="/apikey" />;
    }

    // Eğer API Key varsa, bileşeni render et
    return children;
};

export default ProtectedRoute;
