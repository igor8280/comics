exports.addStarterSchema = {
    // for swagger docs
    description: 'Create test record',
    tags: ['starter'],
    summary: 'Creates new starter with given values',
    // for fastify parsing
    body: 'bodyPostStarter#',
    response: {
        200: 'starter#',
        '4xx': 'error#',
        '5xx': 'error#',
        'default': 'error#'
    }
};

exports.getStarterSchema = {
    // for swagger docs
    description: 'Retrieve records',
    tags: ['starter'],
    summary: 'Returns matched records',
    // for fastify parsing
    query: 'pagination#',
    response: {
        200: 'starterPagination#',
        '4xx': 'error#',
        '5xx': 'error#',
        'default': 'error#'
    }
};

exports.getIdStarterSchema = {
    // for swagger docs
    description: 'Retrieve record',
    tags: ['starter'],
    summary: 'Returns matched record',
    // for fastify parsing
    params: 'paramId#',
    response: {
        200: 'starter#',
        '4xx': 'error#',
        '5xx': 'error#',
        'default': 'error#'
    }
};

exports.putStarterSchema = {
    // for swagger docs
    description: 'Update record',
    tags: ['starter'],
    summary: 'Update matched record',
    // for fastify parsing
    params: 'paramId#',
    body: 'bodyPutStarter#',
    response: {
        200: 'starter#',
        '4xx': 'error#',
        '5xx': 'error#',
        'default': 'error#'
    }
};

exports.deleteStarterSchema = {
    // for swagger docs
    description: 'Delete record',
    tags: ['starter'],
    summary: 'Delete matched record',
    // for fastify parsing
    params: 'paramId#',
    response: {
        200: 'starter#',
        '4xx': 'error#',
        '5xx': 'error#',
        'default': 'error#'
    }
};
