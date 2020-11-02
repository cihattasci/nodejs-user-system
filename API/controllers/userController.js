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

module.exports.register = async (req, res) => {

    var bcrypt_password = await hashingPassword(req.query.password);

    var user = new User({
        email: req.query.email,
        password: bcrypt_password,
    });

    var token = jwt.sign({ userId: user._id.toString() }, process.env.jwtKey);

    var user = new User({
        email: user.email,
        password: user.password,
        token: token,
    });

    await user.save().then(u => res.status(200).send(u)).catch(e => res.status(401).send(e));

};

module.exports.login = async (req, res) => {

    await User.findOne({email: req.query.email})
        .then(async user => {
            var hashedPassword = user.password;
            var passwordFromUser = 'abi123.';
            var match = await isPasswordMatch(passwordFromUser, hashedPassword);
            var token = jwt.sign({ userId: user._id.toString() }, process.env.jwtKey);
            await User.findOneAndUpdate({_id: user._id}, {token: token});
            if(match){
                return res.status(200).send(user);
            } else {
                return res.status(401).send('Login Failed');
            };
        })
        .catch(e => res.status(401).send(e));

};

module.exports.logout = async (req, res) => {

    res.send('logout');

};

module.exports.update_password = async (req, res) => {

    var new_password = 'abi123.';
    var new_hashed_password = await hashingPassword(new_password);

    await User.findOneAndUpdate({email: req.query.email}, {password: new_hashed_password})
        .then(user => res.send(user))
        .catch(e => res.send(e));

};