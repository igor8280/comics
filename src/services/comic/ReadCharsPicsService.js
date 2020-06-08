/**
 * Project name - comics
 * File name - ReadService.js
 * Description - Single action service which returns records from database depending of query
 */
class ReadCharsPicsService {
    constructor({ CharsPicsModel, utils }) {
        this.CharsPicsModel = CharsPicsModel;
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
        const [count, charsPics] = await Promise.all([
            // count all matched documents
            this.CharsPicsModel.find().countDocuments(),

            // find documents using filter and pagination parameters
            this.CharsPicsModel.find({}, null, pagination)
        ]);

        // return data as pagination object
        return this.utils.paginateResponse(charsPics, pagination, count);
    }
}

module.exports = ReadCharsPicsService;
