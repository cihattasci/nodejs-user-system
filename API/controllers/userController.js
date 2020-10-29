var User = require('../models/userModel');
const bcrypt = require('bcrypt');

hashingPassword = passwordToHash => {
    return bcrypt.hash(passwordToHash, 10);
};

isMatchPassword = (passwordFromUser, hashedPassword) => {
    return bcrypt.compare(passwordFromUser, hashedPassword);
};

const register = async (req, res) => {

    var bcrypt_password = await hashingPassword(req.query.password);

    const user = new User({
        email: req.query.email,
        password: bcrypt_password,
    });

    await user.save().then(u => res.send(u)).catch(e => res.send(e));

};

const login = async (req, res) => {

    await User.findOne({email: req.query.email})
        .then(async u => {
            var hashedPassword = u.password;
            var passwordFromUser = 'esra123.';
            var match = await isMatchPassword(passwordFromUser, hashedPassword);

            if(match){
                return res.send('Login Success');
            } else {
                return res.send('Login Failed');
            };
        })
        .catch(e => res.send(e));

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