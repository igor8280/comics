/**
 * Project name - starter
 * File name - index.js
 * Description - General purpose service. All single action (file) services combined into one
 */

// external dependencies
const { RESOLVER } = require('awilix');

class StarterService {
    constructor(container) {
        this.create = container.createStarterService;
        this.read = container.readStarterService;
        this.readOne = container.readOneStarterService;
        this.update = container.updateStarterService;
        this.delete = container.deleteStarterService;
    }

}

// because of DI container names services after a file name who are loaded as bulk,
// we set service name here with RESOLVER option.
StarterService[RESOLVER] = {
    name: 'starterService'
};

module.exports = StarterService;
