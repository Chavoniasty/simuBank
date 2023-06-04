const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0, get: getRoundedBalance },
}, { versionKey: false });


function getRoundedBalance(balance) {
    return Math.round(balance * 100) / 100;
}

const User = mongoose.model('User', userSchema);

module.exports = User;