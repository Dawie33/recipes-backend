// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const genericController = require('../controllers/genericController');
const {recipes} = require('../use-cases');

// Associer le contrôleur générique avec le use case de recette
router.get('/', genericController.getAll(recipes));
router.get('/:id', genericController.getById(recipes));
router.post('/', genericController.create(recipes));
router.put('/:id', genericController.update(recipes));
router.delete('/:id', genericController.delete(recipes));

module.exports = router;
