/**
 * Project name - comic
 * File name - index.js
 * Description - General purpose service. All single action (file) services combined into one
 */

// external dependencies
const { RESOLVER } = require('awilix');

class ComicService {
    constructor(container) {
        this.create = container.createComicService;
        this.read = container.readComicsService;
        this.readOne = container.readComicService;
        this.readChars = container.readCharsPicsService;
        this.update = container.updateComicService;
        this.delete = container.deleteComicService;
    }

}

// because of DI container names services after a file name who are loaded as bulk,
// we set service name here with RESOLVER option.
ComicService[RESOLVER] = {
    name: 'comicService'
};

module.exports = ComicService;
