var express = require('express');
var {verifyToken} = require('../middleware/auth');
var router = express.Router();
var userController = require('../controllers/userController');

router.post('/register', userController.register);

router.post('/login', verifyToken, userController.login);

router.post('/logout', userController.logout);

router.put('/update_password', userController.update_password);

module.exports = router;