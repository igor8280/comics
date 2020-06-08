/**
 * Project name - starter
 * File name - index
 * Description - Import Server from DI and start it
 */
class Application {
	constructor({ server }) {
		this.server = server;
	}

	async start() {
		await this.server.start();
	}
}

module.exports = Application;
