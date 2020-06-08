/**
 * Project name - comic
 * File name - index.js
 * Description - General purpose service. All single action (file) services combined into one
 */

// external dependencies
const { RESOLVER } = require('awilix');

class CollectionService {
    constructor(container) {
        this.create = container.createCollectionService;
        this.read = container.readCollectionsService;
        this.readOne = container.readCollectionService;
        this.update = container.updateCollectionService;
        this.delete = container.deleteCollectionService;
    }

}

// because of DI container names services after a file name who are loaded as bulk,
// we set service name here with RESOLVER option.
CollectionService[RESOLVER] = {
    name: 'collectionService'
};

module.exports = CollectionService;
