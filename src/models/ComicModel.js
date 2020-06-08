/**
 * Project name - starter
 * File name - index.js
 * Description - Database model for mongo db (Comic model)
 */

// external dependencies
const mongoose = require('mongoose');

// Mongoose Schema object
const comicSchema = new mongoose.Schema({
    lik: String,
    izdavac: String,
    edicija: String,
    naziv: String,
    no: String,
    godina: Number,
    mesec: Number,
    scenario: String,
    crtez: String,
    boja: String,
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'ComicModel', default: null}
}, {collection: 'comics', collation: {locale: 'simple'}});

module.exports = mongoose.model('ComicModel', comicSchema);
