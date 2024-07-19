import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import Theme from './public/components/Theme';
import { IsLoginProvider } from './member/contexts/IsLoginContext';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <ThemeProvider theme={Theme}>
        <IsLoginProvider>
          <App />
        </IsLoginProvider>
      </ThemeProvider>
    </CookiesProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
