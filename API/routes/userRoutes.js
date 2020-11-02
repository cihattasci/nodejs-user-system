var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var userController = require('../controllers/userController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.put('/update_password', userController.update_password);

module.exports = router;