const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const productsController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/products'));
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })


router.get('/products/create', productsController.create);
router.post('/products/create', upload.any('image'), productsController.store);


module.exports = router;

