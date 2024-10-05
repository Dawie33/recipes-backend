require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importer cors

// Créer une instance de l'application Express
const app = express();

// Utiliser le middleware CORS
app.use(cors());

// Configurer le pool PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route pour tester la connexion à la base de données
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Vérifie simplement la connexion
    res.json({ message: 'Connexion réussie', time: result.rows[0] });
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données', err);
    res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
  }
});

// Démarrer le serveur sur le port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
