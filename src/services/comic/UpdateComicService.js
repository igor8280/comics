/**
 * Project name - comic
 * File name - UpdateComicService.js
 * Description - Single action service which updates single record in database by id
 */
class UpdateComicService {
    constructor({ ComicModel, utils }) {
        this.ComicModel = ComicModel;
        this.utils = utils;
    }

    /**
     * Update record method
     * @param id {String} - Request query parameter
     * @param comicData {Object} - Request body data
     * @returns {Promise<Object>}
     */
    async execute(id, comicData) {
        // get document to update
        let docComic = await this.ComicModel.findById({'_id': id});

        // throw error if document is not found
        if (!docComic)
            throw 'NOT_FOUND';

        // update Mongoose document (from database) with data from request body
        this.utils.updateDocumentData(docComic, comicData);

        // save update document
        return await docComic.save();
    }
}

module.exports = UpdateComicService;
