const express = require('express');
const router = express.Router();
const controller = require('../controllers/genericController');
const { ingredients } = require('../use-cases');

router.get('/', controller.getAll(ingredients));
router.post('/', controller.create(ingredients));
router.put('/:id', controller.update(ingredients));
router.delete('/:id', controller.delete(ingredients));

module.exports = router;
