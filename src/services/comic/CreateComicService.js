/**
 * Project name - starter
 * File name - CreateStarterService.js
 * Description - Single action service which create a new record in database
 */
class CreateComicService {
    constructor({ ComicModel, utils }) {
        this.utils = utils;
        this.ComicModel = ComicModel;
    }

    /**
     * Insert record method
     * @param comicData {Object} - Request body data
     * @returns {Promise<{Object}>}
     */
    async execute(comicData) {
        // create model with data
        const comicModel = this.utils.fillModel(this.ComicModel, comicData);

        // return document
        return await comicModel.save(comicModel);
    }
}

module.exports = CreateComicService;
