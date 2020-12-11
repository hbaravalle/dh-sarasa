const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');


router.get('/', controller.root);
router.get('/:id', controller.detail);

module.exports = router;

