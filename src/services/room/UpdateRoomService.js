/**
 * Project name - starter
 * File name - UpdateStarterService.js
 * Description - Single action service which updates single record in database by id
 */
class UpdateService {
    constructor({ StarterModel, utils }) {
        this.StarterModel = StarterModel;
        this.utils = utils;
    }

    /**
     * Update record method
     * @param id {String} - Request query parameter
     * @param starterData {Object} - Request body data
     * @returns {Promise<Object>}
     */
    async execute(id, starterData) {
        // get document to update
        let docStarter = await this.StarterModel.findById({'_id': id});

        // throw error if document is not found
        if (!docStarter)
            throw 'NOT_FOUND';

        // update Mongoose document (from database) with data from request body
        this.utils.updateDocumentData(docStarter, starterData);

        // save update document
        return await docStarter.save();
    }
}

module.exports = UpdateService;
