// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const genericController = require('../controllers/genericController');
const { recipes } = require('../use-cases');

// Configurer multer pour le stockage des fichiers (dossier temporaire)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 Mo par fichier
  }).any();
  
// Routes associées au contrôleur générique avec gestion des fichiers
router.get('/', genericController.getAll(recipes));
router.get('/:id', genericController.getById(recipes));
router.post('/',upload, genericController.create(recipes));
router.delete('/:id', genericController.delete(recipes));

module.exports = router;
