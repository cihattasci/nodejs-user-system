var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyToken = async (req, res, next) => {
    var bearerHeader = req.headers['authorization'];

    if (token === null) return res.status(401).send('auth error')

    var token = bearerHeader.replace('Bearer ', '');

    jwt.verify(token, process.env.jwtKey, (err, user) => {
        if (err) return res.status(403).send('verify error');
        req.user = user;
        next();
    });
}