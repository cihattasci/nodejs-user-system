var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type : Date,
        default : Date.now,
    },
    token: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;