// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration de la connexion pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestion_employes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

// Test de connexion automatique au démarrage
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connecté à la base de données MySQL');
    connection.release();
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données :', error.message);
    process.exit(1);
  }
})();

module.exports = pool;