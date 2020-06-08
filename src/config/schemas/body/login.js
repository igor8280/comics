const loginDefinitions = require('../definitions/login');

module.exports = [
    {
        $id: 'bodyLogin',
        type: 'object',
        required: ['email', 'password'],
        properties: loginDefinitions.login
    }
];
