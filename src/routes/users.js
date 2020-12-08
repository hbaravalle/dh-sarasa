const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidatior');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), registerValidator, usersController.save);

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidator, usersController.logged);

router.get('/profile', authMiddleware, usersController.profile);

module.exports = router;