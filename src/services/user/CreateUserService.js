/**
 * Project name - starter
 * File name - CreateStarterService.js
 * Description - Single action service which create a new record in database
 */
class CreateUserService {
    constructor({ UserModel, utils }) {
        this.utils = utils;
        this.UserModel = UserModel;
        this.bcrypt = require('bcrypt');
    }

    /**
     * Insert record method
     * @param userData {Object} - Request body data
     * @returns {Promise<{Object}>}
     */
    async execute(userData) {
        try {
            // create model with data
            const salt = this.bcrypt.genSaltSync(12);
            // hash password
            userData.password = this.bcrypt.hashSync(userData.password, salt);
            // hash activation link
            userData.activationLink = this.bcrypt.hashSync(userData.email, salt);
            const userModel = this.utils.fillModel(this.UserModel, userData);

            // return document
            return await userModel.save(userModel);
        } catch (e) {
            throw e;
        }

    }
}

module.exports = CreateUserService;
