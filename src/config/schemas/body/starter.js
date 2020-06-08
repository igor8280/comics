const _ = require('lodash');
const starter = require('../definitions/starter');

module.exports = [
    {
        $id: 'bodyPostStarter',
        type: 'object',
        required: ['title'],
        properties: _.omit(starter, ['_id', '__v'])
    },
    {
        $id: 'bodyPutStarter',
        type: 'object',
        required: ['title', '__v'],
        properties: _.omit(starter, ['_id'])
    }
];
