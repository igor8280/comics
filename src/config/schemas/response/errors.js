const errors  = require('../definitions/errors');

module.exports = [
    {
        $id: 'error',
        type: 'object',
        description: 'Default Error Response',
        properties: errors.error
    }
];
