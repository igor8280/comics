/**
 * Project name - starter
 * File name - CreateStarterService.js
 * Description - Single action service which create a new record in database
 */
class CreateService {
    constructor({ StarterModel, utils }) {
        this.utils = utils;
        this.StarterModel = StarterModel;
    }

    /**
     * Insert record method
     * @param starterData {Object} - Request body data
     * @returns {Promise<{Object}>}
     */
    async execute(starterData) {
        // create model with data
        const starterModel = this.utils.fillModel(this.StarterModel, starterData);

        // return document
        return await starterModel.save(starterModel);
    }
}

module.exports = CreateService;
