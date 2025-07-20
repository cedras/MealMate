import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);