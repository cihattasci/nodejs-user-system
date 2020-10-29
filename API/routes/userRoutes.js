var express = require('express');
var router = express.Router();
var {register, login, logout, update_password} = require('../controllers/userController');

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update_account' ,update_password);

module.exports = router;