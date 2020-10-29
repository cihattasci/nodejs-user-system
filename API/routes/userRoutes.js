var express = require('express');
var {register, login, logout, update_account} = require('../controllers/userController');

var router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update_account' ,update_account);

module.exports = router;