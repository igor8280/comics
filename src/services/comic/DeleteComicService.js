/**
 * Project name - starter
 * File name - DeleteStarterService.js
 * Description - Single action service which deletes a record in database
 */
class DeleteComicService {
    constructor({ ComicModel }) {
        this.ComicModel = ComicModel;
    }

    /**
     * Delete record method
     * @param id {String} - Request query parameter
     * @returns {Promise<{Object}>}
     */
    async execute(id) {
        // delete document by id
        const deletedComic = await this.ComicModel.findByIdAndRemove(id);

        // if document could not be deleted
        if (!deletedComic)
            throw 'NOT_DELETED';

        // return deleted document
        return deletedComic;
    }
}

module.exports = DeleteComicService;
