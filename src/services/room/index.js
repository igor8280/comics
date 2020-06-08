/**
 * Project name - chat
 * File name - index.js
 * Description - General purpose service. All single action (file) services combined into one
 */

// external dependencies
const { RESOLVER } = require('awilix');

class RoomsService {
    constructor(container) {
        // this.create = container.createRoomService;
        this.read = container.readRoomsService;
        // this.readOne = container.readRoomService;
        // this.update = container.updateRoomService;
        // this.delete = container.deleteRoomService;
    }

}

// because of DI container names services after a file name who are loaded as bulk,
// we set service name here with RESOLVER option.
RoomsService[RESOLVER] = {
    name: 'roomService'
};

module.exports = RoomsService;
