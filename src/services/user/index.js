/**
 * Project name - starter
 * File name - index.js
 * Description - General purpose service. All single action (file) services combined into one
 */

// external dependencies
const { RESOLVER } = require('awilix');

class UserService {
    constructor(container) {
        this.create = container.createUserService;
        this.read = container.readUsersService;
        this.readOne = container.readUserService;
        this.update = container.updateUserService;
        this.delete = container.deleteUserService;
    }

}

// because of DI container names services after a file name who are loaded as bulk,
// we set service name here with RESOLVER option.
UserService[RESOLVER] = {
    name: 'userService'
};

module.exports = UserService;
