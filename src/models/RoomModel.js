/**
 * Project name - chat
 * File name - index.js
 * Description - Database model for mongo db (Room model)
 */

// external dependencies
const mongoose = require('mongoose');

// Mongoose Schema object
const roomSchema = new mongoose.Schema({
    name: {type: String, unique: true}
});

module.exports = mongoose.model('Room', roomSchema);
