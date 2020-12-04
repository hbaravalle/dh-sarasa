const path = require('path');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const registerValidator = require('../validations/registerValidator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })

router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), registerValidator, usersController.save);

router.get('/login', usersController.login);

module.exports = router;