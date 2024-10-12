const express = require('express');
const router = express.Router();
const controller = require('../controllers/genericController');
const instructions = require('../data-access/instructions');

// Utiliser les méthodes du contrôleur générique avec la couche d'accès aux données
router.get('/', controller.getAll(instructions));
router.post('/', controller.create(instructions));
router.put('/:id', controller.update(instructions));
router.delete('/:id', controller.delete(instructions));

module.exports = router;
