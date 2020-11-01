var User = require('../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

hashingPassword = passwordToHash => {
    return bcrypt.hash(passwordToHash, 9);
};

isPasswordMatch = (passwordFromUser, hashedPassword) => {
    return bcrypt.compare(passwordFromUser, hashedPassword);
};

const register = async (req, res) => {

    var bcrypt_password = await hashingPassword(req.query.password);

    const user = new User({
        email: req.query.email,
        password: bcrypt_password,
    });

    var token = jwt.sign({ userId: user._id.toString() }, process.env.jwtKey);

    await user.save().then(u => res.status(201).send({u, token})).catch(e => res.send(e));

};

const login = async (req, res) => {

    await User.findOne({email: req.query.email})
        .then(async user => {
            var hashedPassword = user.password;
            var passwordFromUser = 'cihat123.';
            var match = await isPasswordMatch(passwordFromUser, hashedPassword);
            var token = jwt.sign({ userId: user._id.toString() }, process.env.jwtKey);

            if(match){
                return res.status(200).send({user, token});
            } else {
                return res.status(401).send('Login Failed');
            };
        })
        .catch(e => res.status(401).send(e));

};

const logout = async (req, res) => {

    res.send('logout');

};
const update_password = async (req, res) => {

    res.send('update_account');

};

module.exports = {
    register,
    login,
    logout,
    update_password,
};