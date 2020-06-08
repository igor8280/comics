/**
 * Project name - comic
 * File name - index.js
 * Description - Database model for mongo db (Collection model - example)
 */

// external dependencies
const mongoose = require('mongoose');

// Mongoose Schema object
const collectionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    character: {type: String},
    comicCollection: [{type: mongoose.Schema.Types.ObjectId, ref: 'ComicModel'}]
});

module.exports = mongoose.model('Collection', collectionSchema);
