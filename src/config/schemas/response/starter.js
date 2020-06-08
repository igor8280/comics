const utils = require('../utils');
const starter = require('../definitions/starter');

module.exports = [
    {
        $id: 'starter',
        type: 'object',
        properties: starter
    },
    {
        $id: 'starterPagination',
        type: 'object',
        properties: utils.paginateResponse('starter#')
    }
];
