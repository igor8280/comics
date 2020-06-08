/**
 * Project name - starter
 * File name - index
 * Description -
 */
// import schemas
const schemas = require('../schemas');

class Router {
	constructor({fastify, routes, errorHandler}) {
		return (() => {
			// register all schemas
			schemas.forEach(definition => {
				fastify.addSchema(definition);
			});

			// console unhandled/unexpected errors
			process.on('unhandledRejection', (reason, promise) => {
				console.log('Unhandled Rejection at:', reason.stack || reason);
				// Recommended: send the information to sentry.io
				// or whatever crash reporting service you use
			});

			// Loop over each route and add to fastify
			routes.paths.forEach((route) => {
				fastify.route(route);
			});

			// add custom error handler function to fastify 'reply' object
			fastify.decorateReply('errorHandler', function(arg) {
				let error = errorHandler.handle(arg);

				if (process.env.NODE_ENV === 'development' && error.status === 500)
					console.log('<<< development error >>>', arg instanceof Error ? arg.stack : arg);

				this.status(error.status).send(error);
			});

			return fastify;
		})();
	}
}

module.exports = Router;
