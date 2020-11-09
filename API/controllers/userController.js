var User = require('../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

hashingPassword = passwordToHash => {
    return bcrypt.hash(passwordToHash, 8);
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

    var token = jwt.sign({ user }, process.env.jwtKey);

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
                if(match){
                    return res.status(200).send(user);
                } else {
                    return res.status(401).send('Password Login Failed');
                };
            })
            .catch(e => res.status(401).send('No User'));

};

module.exports.logout = async (req, res) => {

    await User.findOneAndUpdate({email: req.query.email}, {token: null}, (err, docs) => {
        if(err){
            return res.send(err);
        };

        return res.send(docs);
    });

};

module.exports.update_password = async (req, res) => {

    var new_password = 'Abi123.';
    var new_hashed_password = await hashingPassword(new_password);

    await User.findOneAndUpdate({email: req.query.email}, {password: new_hashed_password})
        .then(user => res.send(user))
        .catch(e => res.send(e));

};