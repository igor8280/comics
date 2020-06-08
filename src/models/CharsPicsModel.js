/**
 * Project name - comics
 * File name - index.js
 * Description - Database model for mongo db (Characters pictures model)
 */

// external dependencies
const mongoose = require('mongoose');

// Mongoose Schema object
const charsPicsSchema = new mongoose.Schema({
    lik: String,
    url: String
}, {collection: 'charsPics', collation: {locale: 'simple'}});

module.exports = mongoose.model('CharsPicsModel', charsPicsSchema);
