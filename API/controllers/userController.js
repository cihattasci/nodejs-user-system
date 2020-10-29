var User = require('../models/userModel');
const bcrypt = require('bcrypt');

var saltRounds = 10;

const register = async (req, res) => {

    bcrypt.hash(req.query.password, saltRounds, async (err, hash) => {

        if(err){
            return res.send(err);
        };

        var bcrypt_password = hash;

        const user = new User({
            email: req.query.email,
            password: bcrypt_password,
        });

        await user.save().then(u => res.send(u)).catch(e => res.send(e));
    });

};

const login = async (req, res) => {

    res.send('login');

};

const logout = async (req, res) => {

    res.send('logout');

};
const update_account = async (req, res) => {

    res.send('update_account');

};


module.exports = {
    register,
    login,
    logout,
    update_account,
};