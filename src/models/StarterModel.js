/**
 * Project name - starter
 * File name - index.js
 * Description - Database model for mongo db (Starter model - example)
 */

// external dependencies
const mongoose = require('mongoose');

// Mongoose Schema object
const starterSchema = new mongoose.Schema({
    title: String,
    brand: String,
    price: String,
    age: Number,
    services: {
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Starter', starterSchema);
