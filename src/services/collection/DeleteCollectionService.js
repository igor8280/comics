/**
 * Project name - starter
 * File name - DeleteStarterService.js
 * Description - Single action service which deletes a record in database
 */
class DeleteService {
    constructor({ StarterModel }) {
        this.StarterModel = StarterModel;
    }

    /**
     * Delete record method
     * @param id {String} - Request query parameter
     * @returns {Promise<{Object}>}
     */
    async execute(id) {
        // delete document by id
        const deletedStarter = await this.StarterModel.findByIdAndRemove(id);

        // if document could not be deleted
        if (!deletedStarter)
            throw 'NOT_DELETED';

        // return deleted document
        return deletedStarter;
    }
}

module.exports = DeleteService;
