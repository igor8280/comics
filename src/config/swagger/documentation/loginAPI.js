exports.loginSchema = {
    // for swagger docs
    description: 'Login',
    tags: ['Authorization'],
    summary: 'Application authorization',
    // for fastify parsing
    body: 'bodyLogin#',
    response: {
        200: 'responseLogin#',
        '4xx': 'error#',
        '5xx': 'error#',
        'default': 'error#'
    }
};
