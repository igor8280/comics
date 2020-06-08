const queries = require('../definitions/queries');

module.exports = [
    {
        $id: 'pagination',
        type: 'object',
        properties: queries.pagination
    },
    {
        $id: 'paginationAndSearch',
        type: 'object',
        properties: queries.paginationAndSearch
    }
];
