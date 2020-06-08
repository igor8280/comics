/**
 * Project name - starter
 * File name - ReadService.js
 * Description - Single action service which returns records from database depending of query
 */
class ReadService {
    constructor({ CollectionModel, utils }) {
        this.CollectionModel = CollectionModel;
        this.utils = utils;
    }

    /**
     * Get data method
     * @param query {Object} - Request query object
     * @returns {Promise<{total: {type: string},
     *              pages: {type: string}, limit: {type: string}, sortBy: {type: string[]},
     *              page: {type: string}, content: {type: string, items: *}}
     * |{total: number, pages: number, limit: number, sortBy: *, page: number, content: Array}>}
     */
    async execute(query) {
        // get pagination for mongo query
        const pagination = this.utils.getPagination(query);

        // run two queries in parallel to get matched count and starters
        const [count, starters] = await Promise.all([
            // count all matched documents
            this.CollectionModel.find().countDocuments(),

            // find documents using filter and pagination parameters
            this.CollectionModel.find({}, null, pagination)
        ]);

        // return data as pagination object
        return this.utils.paginateResponse(starters, pagination, count);
    }
}

module.exports = ReadService;
