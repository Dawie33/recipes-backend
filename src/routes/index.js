const express = require('express');
const router = express.Router();

// Importer les routes spécifiques
const recipeRoutes = require('./recipes');
const ingredientRoutes = require('./ingredients');

// Utiliser les routes spécifiques
router.use('/recipes', recipeRoutes);  // Routes pour les recettes
router.use('/ingredients', ingredientRoutes);  // Routes pour les ingrédients

module.exports = router;
