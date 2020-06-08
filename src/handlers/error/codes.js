/**
 * Project name - starter
 * File name - codes.js
 * Description - Error messages
 * NOTE!!! Import translations for messages to be implemented
 */
let codes = {
    'NOT_DELETED': {
        status: 400,
        name: 'NOT_DELETED',
        message: 'Record could not be deleted!'
    },
    'NOT_FOUND': {
        status: 400,
        name: 'NOT_FOUND',
        message: 'Record not found!'
    },
    'NOT_AUTHORIZED': {
        status: 401,
        name: 'NOT_AUTHORIZED',
        message: 'Authorization failed!'
    },
    // mongoose errors
    'CastError': {
        status: 400,
        name: 'Bad request',
        message: 'Invalid value for mongoose type conversion'
    },
    'ValidationError': {
        status: 400,
        name: 'Bad request',
        message: 'Mongoose model validation error'
    },
    // mongoose plugin errors
    // (mongoose-update-if-current) plugin for concurrency control
    'VersionError': {
        status: 400,
        name: 'Bad request',
        message: 'Document can not be updated - version has changed.'
    },
    // Mongo errors
    'MongoError11000': {
        status: 500,
        name: 'MongoError',
        message: 'Duplicate key error collection. Record with same unique property already exists!'
    }
};

module.exports = codes;
