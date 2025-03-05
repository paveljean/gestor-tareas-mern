import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; 
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>    
  </StrictMode>
);

//con AuthProvider user, login y logout estan disponibles en la aplicacion
//StrictMode ayuda a detectar errores en desarrollo
//Carga indez.css y App.jsx como punto de partida principal