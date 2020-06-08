/**
 * Project name - starter
 * File name - index.js
 * Description - Application starter (import DI container, resolve application class and start server)
 */
const container = require('./config/container');
const app = container.resolve('app');

app
	.start()
	.catch((error) => {
		console.log(error);
		// app.logger.error(error.stack);
		process.exit();
	});
