/**
 * Project name - starter
 * File name - index
 * Description - Import all application dependencies into container (dependency injection)
 * https://www.npmjs.com/package/awilix
 */
const awilix = require('awilix');

const Application = require('../application');
const Server = require('../server');
const Database = require('../database/mongo');
const DBDropService = require('../../services/database/DropDBService');
const Auth = require('../../handlers/auth');

// utility functions (as object)
const utils = require('../../utils');
const config = require('../index');

// Error handler
const ErrorHandler = require('../../handlers/error/');

// Router
const fastify = require('../router/fastify');
const Router = require('../router');
const Socket = require('../socket');

// Routes
const Routes = require('../router/routes/');

// create (dependency injection) container
const container = awilix.createContainer();

// System
container
	.register({
		app: awilix.asClass(Application).singleton(),
		server: awilix.asClass(Server).singleton(),
		dbConn: awilix.asClass(Database).singleton(),
		auth: awilix.asClass(Auth).singleton(),
		dbDropService: awilix.asClass(DBDropService).singleton()
	})
	.register({
		fastify: awilix.asFunction(fastify).singleton(),
		config: awilix.asValue(config)
	});

// Utils
container
	.register({
		utils: awilix.asValue(utils)
	});

// Auto load module (models, services, controllers)
container
	.loadModules([
		'src/models/*.js'
	], {
		resolverOptions: {
			register: awilix.asValue,
			lifetime: awilix.Lifetime.SINGLETON
		}
	})
	.loadModules([
		'src/services/**/*.js',
		'src/controllers/*.js'
	], {
		formatName: 'camelCase',
		resolverOptions: {
			lifetime: awilix.Lifetime.SINGLETON,
			register: awilix.asClass
		}
	});

// Custom error handler
container
	.register({
		errorHandler: awilix.asClass(ErrorHandler)
	});

// Router
container
	.register({
		router: awilix.asClass(Router).singleton()
	});

// Socket
container
	.register({
		socket: awilix.asClass(Socket).singleton()
	});

// Routes
container
	.register({
		routes: awilix.asClass(Routes)
	});

module.exports = container;
