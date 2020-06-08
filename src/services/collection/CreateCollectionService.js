/**
 * Project name - comic
 * File name - CreateCollectionService.js
 * Description - Single action service which create a new record in database
 */
class CreateCollectionService {
    constructor({ CollectionModel, utils }) {
        this.utils = utils;
        this.CollectionModel = CollectionModel;
    }

    /**
     * Insert record method
     * @param query {Object} - Request query
     * @param collectionData {Object} - Request body data
     * @returns {Promise<{Object}>}
     */
    async execute(query, collectionData) {
        let data = Object.assign({}, query, collectionData);
        // create model with data
        const collectionModel = this.utils.fillModel(this.CollectionModel, data);

        // return document
        return await collectionModel.save(collectionModel);
    }
}

module.exports = CreateCollectionService;
