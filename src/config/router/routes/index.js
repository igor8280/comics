/**
 * Project name - starter
 * File name - index
 * Description - Routes definitions (with handlers functions, swagger schemas, authentication...)
 */

// Import Swagger documentation
const docs = require('../../swagger/documentation');

class Routes {
    constructor(opts) {
        this.paths = [
            {
                method: 'GET',
                url: '/',
                handler: (request, reply) => {
                    reply.send('Welcome to Home page...');
                },
                // preValidation: authenticate
            },
            {
                method: 'POST',
                url: '/db-drop',
                handler: opts.dbDropService.execute
            },
            {
                method: 'POST',
                url: '/login',
                schema: docs.login.loginSchema,
                handler: opts.auth.loginHandler
            },
            {
                method: 'GET',
                url: '/api/starter',
                handler: opts.starterController.read,
                schema: docs.starter.getStarterSchema,
                preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/starter/:id',
                handler: opts.starterController.readOne,
                schema: docs.starter.getIdStarterSchema,
                preValidation: opts.auth.validateUser
            },
            {
                method: 'POST',
                url: '/api/starter',
                handler: opts.starterController.create,
                schema: docs.starter.addStarterSchema,
                preValidation: opts.auth.validateUser
            },
            {
                method: 'PUT',
                url: '/api/starter/:id',
                handler: opts.starterController.update,
                schema: docs.starter.putStarterSchema,
                preValidation: opts.auth.validateUser
            },
            {
                method: 'DELETE',
                url: '/api/starter/:id',
                handler: opts.starterController.delete,
                schema: docs.starter.deleteStarterSchema,
                preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/comics',
                handler: opts.charPicController.read,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'POST',
                url: '/api/comics',
                handler: opts.comicController.create,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/comics/character/:character',
                handler: opts.comicController.read,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/comics/character/:character/:id',
                handler: opts.comicController.readOne,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'PUT',
                url: '/api/comics/character/:character/:id',
                handler: opts.comicController.update,
                // schema: docs.starter.putStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'DELETE',
                url: '/api/comics/character/:character/:id',
                handler: opts.comicController.delete,
                // schema: docs.starter.deleteStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/users',
                handler: opts.userController.read,
                // schema: docs.user.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/users/:id',
                handler: opts.userController.readOne,
                // schema: docs.user.getIdStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'POST',
                url: '/api/users',
                handler: opts.userController.create,
                // schema: docs.user.addStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'PUT',
                url: '/api/users/:id',
                handler: opts.userController.update,
                // schema: docs.user.putStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'DELETE',
                url: '/api/users/:id',
                handler: opts.userController.delete,
                // schema: docs.user.deleteStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/collections/character/:character/user/:user/collection',
                handler: opts.collectionController.readOne,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'POST',
                url: '/api/collections/character/:character/user/:user/collection',
                handler: opts.collectionController.create,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'PUT',
                url: '/api/collections/character/:character/user/:user/collection/:id',
                handler: opts.collectionController.update,
                // schema: docs.starter.getStarterSchema,
                // preValidation: opts.auth.validateUser
            },
            {
                method: 'GET',
                url: '/api/rooms',
                handler: opts.roomController.read,
                // schema: docs.user.getStarterSchema,
                // preValidation: opts.auth.validateUser
            }
        ];
    }
}

module.exports = Routes;
