/**
 * Project name - starter
 * File name - UpdateCollectionService.js
 * Description - Single action service which updates single record in database by id
 */
class UpdateCollectionService {
    constructor({ CollectionModel, utils }) {
        this.CollectionModel = CollectionModel;
        this.utils = utils;
    }

    /**
     * Update record method
     * @param params {String} - Request query parameter
     * @param comicCollection {Object} - Request body data
     * @returns {Promise<Object>}
     */
    async execute(req) {
        let params = req.params;
        let data = req.body;
        let query = req.query;
        console.log('params', params);
        console.log('data', data);
        console.log('query', query);
        // get document to update
        if (query && query.removeFromCollection === 'true')
            return await this.CollectionModel.updateOne({'_id': params.id}, {'$pull': {comicCollection: data.id}});
        else
            return await this.CollectionModel.updateOne({'_id': params.id}, {'$addToSet': {comicCollection: data.id}});

        // throw error if document is not found
        // if (!docCollection)
        //     throw 'NOT_FOUND';

        // update Mongoose document (from database) with data from request body
        // this.utils.updateDocumentData(docCollection, collectionData);

        // save update document
        // return await docCollection.save();
    }
}

module.exports = UpdateCollectionService;
