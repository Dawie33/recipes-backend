const express = require('express');
const app = express();
const ingredientRoutes = require('./routes/ingredients'); 
const recipeRoutes = require('./routes/recipes');
const instructionRoutes = require('./routes/instructions');
const categoryRoutes = require('./routes/categories');


app.use(express.json());


app.use('/api/ingredients', ingredientRoutes); 
app.use('/api/recipes', recipeRoutes);
app.use('/api/instructions', instructionRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
