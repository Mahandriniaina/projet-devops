import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot
import App from './App';
import './styles/global.css';

// Sélectionnez l'élément racine
const container = document.getElementById('root');

// Créez une racine et rendez l'application
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);