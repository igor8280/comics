/**
 * Project name - starter
 * File name - UpdateUserService.js
 * Description - Single action service which updates single record in database by id
 */
class UpdateUser {
    constructor({ UserModel, utils }) {
        this.UserModel = UserModel;
        this.utils = utils;
    }

    /**
     * Update record method
     * @param id {String} - Request query parameter
     * @param userData {Object} - Request body data
     * @returns {Promise<Object>}
     */
    async execute(id, userData) {
        // get document to update
        let docUser = await this.UserModel.findById({'_id': id});

        // throw error if document is not found
        if (!docUser)
            throw 'NOT_FOUND';

        // update Mongoose document (from database) with data from request body
        this.utils.updateDocumentData(docUser, userData);

        // save update document
        return await docUser.save();
    }
}

module.exports = UpdateUser;
