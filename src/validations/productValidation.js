const { check } = require('express-validator');

module.exports = [
    check('name')
        .isLength({ min: 4, max: 50 })
        .withMessage('Debes ingresar el nombre del producto'),
    check('description')
        .isLength({ min: 8 })
        .withMessage('Debes ingresar la descripcion del producto'),
]