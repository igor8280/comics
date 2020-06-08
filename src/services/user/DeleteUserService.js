/**
 * Project name - starter
 * File name - DeleteStarterService.js
 * Description - Single action service which deletes a record in database
 */
class DeleteUserService {
    constructor({ UserModel }) {
        this.UserModel = UserModel;
    }

    /**
     * Delete record method
     * @param id {String} - Request query parameter
     * @returns {Promise<{Object}>}
     */
    async execute(id) {
        // delete document by id
        const deletedUser = await this.UserModel.findByIdAndRemove(id);

        // if document could not be deleted
        if (!deletedUser)
            throw 'NOT_DELETED';

        // return deleted document
        return deletedUser;
    }
}

module.exports = DeleteUserService;
