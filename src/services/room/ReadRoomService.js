/**
 * Project name - starter
 * File name - ReadOneStarterService.js
 * Description - Single action service which gets record by id from database
 */
class ReadOne {
    constructor({ StarterModel }) {
        this.StarterModel = StarterModel;
    }

    /**
     * Get one record method
     * @param id {String} - Request query parameter
     * @returns {Promise<Object>}
     */
    async execute(id) {
        // find document by id
        const starter = await this.StarterModel.findById(id);

        // throw error if document is not found
        if (!starter)
            throw 'NOT_FOUND';

        // return document
        return starter;
    }
}

module.exports = ReadOne;
