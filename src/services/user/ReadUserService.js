/**
 * Project name - user
 * File name - ReadUserService.js
 * Description - Single action service which gets record by id from database
 */
class ReadUser {
    constructor({ UserModel }) {
        this.UserModel = UserModel;
        this.lodash = require('lodash');
    }

    /**
     * Get one record method
     * @param id {String} - Request query parameter
     * @returns {Promise<Object>}
     */
    async execute(id) {
        // find document by id
        const user = await this.UserModel.findById(id);

        // throw error if document is not found
        if (!user)
            throw 'NOT_FOUND';

        // return document
        return this.lodash.omit(user.toJSON(), ['password']);
    }
}

module.exports = ReadUser;
