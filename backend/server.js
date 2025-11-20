// server.js
require('dotenv').config();
const app = require('./app');
const pool = require('./src/config/db');
const port = process.env.PORT || 5000;

// Vérification des variables d'environnement
console.log('\n=== Configuration base de données ===');
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_USER:', process.env.DB_USER || 'root');
console.log('DB_NAME:', process.env.DB_NAME || 'gestion_employes');

// Test de connexion à la base de données
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('\n🔌 Tentative de connexion à la base de données...');
    
    // Test simple de requête SQL
    const [result] = await connection.query('SELECT 1 + 1 AS result');
    console.log('✅ Test de requête réussi:', result[0].result === 2 ? 'OK' : 'Échec');
    
    connection.release();
    console.log('🗂️  Tables disponibles:', await getDatabaseTables());
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    return false;
  }
}

// Liste des tables disponibles (pour vérification)
async function getDatabaseTables() {
  const [tables] = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = ?",
    [process.env.DB_NAME || 'gestion_employes']
  );
  return tables.map(t => t.TABLE_NAME);
}

// Démarrage sécurisé du serveur
async function startServer() {
  const dbConnected = await testDbConnection();
  
  if (!dbConnected) {
    console.error('\n🚨 Impossible de démarrer le serveur sans connexion DB');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`\n🚀 Serveur démarré sur http://localhost:${port}`);
    console.log(`📡 Routes disponibles:`);
    console.log(`   - GET  /api/employes`);
    console.log(`   - POST /api/employes`);
    console.log(`   - GET  /api/employes/stats`);
  });
}

startServer();