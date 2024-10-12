const express = require('express');
const router = express.Router();
const genericController = require('../controllers/genericController');
const categories = require('../data-access/categories');

// Utiliser les méthodes du contrôleur générique avec la couche d'accès aux données
router.get('/', genericController.getAll(categories));
router.post('/', genericController.create(categories));
router.put('/:id', genericController.update(categories));
router.delete('/:id', genericController.delete(categories));

module.exports = router;
