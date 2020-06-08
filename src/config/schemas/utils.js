module.exports = {
    /**
     * schema generator for paginated response
     * @param schema {String} that should be used as content
     * @param $id {String} name for new generated schema
     * @returns {{total: {type: string}, pages: {type: string}, limit: {type: string}, sortBy: {type: [string, string]}, page: {type: string}, content: {type: string, items: *}}}
     */
    paginateResponse(schema) {
        return {
            content: {
                type: 'array',
                items: schema
            },
            page: {type: 'number'},
            limit: {type: 'number'},
            total: {type: 'number'},
            pages: {type: 'number'},
            sortBy: {type: ['string', 'null']}
        }
    }
};
