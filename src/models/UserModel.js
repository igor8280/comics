/**
 * Project name - comic
 * File name - index.js
 * Description - Database model for mongo db (User model - example)
 */

// external dependencies
const mongoose = require('mongoose');

// Mongoose Schema object
const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String},
    nickname: {type: String},
    access: {type: String, default: 'R'},
    active: {type: Boolean, default: false},
    activationLink: {type: String}
});

module.exports = mongoose.model('User', userSchema);
