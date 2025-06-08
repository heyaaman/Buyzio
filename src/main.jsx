import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProviderWrapper, ColorModeContext } from './ThemeContext';
import CssBaseline from '@mui/material/CssBaseline'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <CssBaseline />
        <App />
      </ThemeProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
