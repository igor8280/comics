/**
 * Project name - starter
 * File name - ReadComicService.js
 * Description - Single action service which gets record by id from database
 */
class ReadComic {
    constructor({ ComicModel }) {
        this.ComicModel = ComicModel;
    }

    /**
     * Get one record method
     * @param id {String} - Request query parameter
     * @returns {Promise<Object>}
     */
    async execute(id) {
        // find document by id
        const comic = await this.ComicModel.findById(id);

        // throw error if document is not found
        if (!comic)
            throw 'NOT_FOUND';

        // return document
        return comic;
    }
}

module.exports = ReadComic;
