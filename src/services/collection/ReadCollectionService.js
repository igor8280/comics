/**
 * Project name - starter
 * File name - ReadOneStarterService.js
 * Description - Single action service which gets record by id from database
 */
class ReadCollection {
    constructor({ CollectionModel }) {
        this.CollectionModel = CollectionModel;
    }

    /**
     * Get one record method
     * @param user {String} - Request parameter
     * @param char {String} - Request parameter
     * @returns {Promise<Object>}
     */
    async execute(char, user) {
        // find document
        const collection = await this.CollectionModel.findOne({character: char, user: user}).populate('comicCollection');

        // throw error if document is not found
        if (!collection)
            throw 'NOT_FOUND';

        // return document
        return collection;
    }
}

module.exports = ReadCollection;
