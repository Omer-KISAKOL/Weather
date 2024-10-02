import './App.css'
import WeatherDisplay from "./pages/WeatherDisplay.jsx";
import ProtectedRoute from './ProtectedRoute.jsx';
import ApiKeyInput from "./pages/ApiKeyInput.jsx";
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function App() {

  return (
          <Routes>
              {/* API Key girilen sayfa */}
              <Route path="/login" element={<ApiKeyInput />} />

              {/* Korunan rota: Sadece API Key girilirse erişilebilir */}
              <Route
                  path="/weather"
                  element={
                      <ProtectedRoute>
                          <WeatherDisplay />
                      </ProtectedRoute>
                  }
              />

              {/* Eğer başka bir rota girilirse kullanıcı API Key sayfasına yönlendirilir */}
              <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
  )
}

export default App
