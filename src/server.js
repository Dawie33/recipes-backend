const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const ingredientRoutes = require('./routes/ingredients'); 
const recipeRoutes = require('./routes/recipes');
const instructionRoutes = require('./routes/instructions');
const categoryRoutes = require('./routes/categories');

app.use(cors());
app.use(express.json());


app.use('/recipes/ingredients', ingredientRoutes); 
app.use('/recipes', recipeRoutes);
app.use('/recipes/instructions', instructionRoutes);
app.use('/recipes/categories', categoryRoutes);
// Servir les fichiers statiques du dossier "uploads"

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
