// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const genericController = require('../controllers/genericController');
const { recipes } = require('../use-cases');

// Configurer multer pour le stockage des fichiers (dossier temporaire)
const storage = multer.memoryStorage(); // ou multer.diskStorage({ destination: 'uploads/' }) pour un dossier physique
const upload = multer({ storage });

// Routes associées au contrôleur générique avec gestion des fichiers
router.get('/', genericController.getAll(recipes));
router.get('/:id', genericController.getById(recipes));
router.post('/', upload.single('image'), genericController.create(recipes)); // Ajout de upload.single('image')
router.put('/:id', upload.single('image'), genericController.update(recipes)); // Ajout de upload.single('image')
router.delete('/:id', genericController.delete(recipes));

module.exports = router;
