import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import MetaTag from './components/meta/MetaTag';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <MetaTag />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
