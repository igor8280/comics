/**
 * Project name - starter
 * File name - ReadUsers.js
 * Description - Single action service which returns records from database depending of query
 */
class ReadUsers {
    constructor({ UserModel, utils }) {
        this.UserModel = UserModel;
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
        let params = {};

        // get pagination for mongo query
        const pagination = this.utils.getPagination(query);

        if (query.email) {
            let regex = new RegExp(`^${query.email}`, 'gi');
            params.email = {'$regex': regex};
        }

        // run two queries in parallel to get matched count and starters
        const [count, users] = await Promise.all([
            // count all matched documents
            this.UserModel.find(params).countDocuments(),

            // find documents using filter and pagination parameters
            this.UserModel.find(params, null, pagination)
        ]);

        // return data as pagination object
        return this.utils.paginateResponse(users, pagination, count);
    }
}

module.exports = ReadUsers;
