// app.js
const express = require('express');
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler'); // Chemin corrigé
const employeRoutes = require('./src/routes/employeRoutes'); // Adaptez si nécessaire

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.send('API Gestion Employés - Fonctionnelle');
});

// Routes des employés
app.use('/api/employes', employeRoutes);

// Gestion des erreurs
app.use(errorHandler);

module.exports = app; // Ligne cruciale