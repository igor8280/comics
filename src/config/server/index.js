/**
 * Project name - starter
 * File name - index
 * Description - Import configuration, router (fastify) and database connection from DI then create database connection and start server (listening on port)
 */
class Server {
	constructor({ config, router, dbConn, socket }) {
		this.config = config;
		this.router = router;
		this.dbConn = dbConn;
		this.socket = socket;
	}

	// Run the server!
	async start() {
		try {
			// create database connection
			await this.dbConn.connectDB();

			// set socket.io events
			this.socket.setup();

			// start server
			await this.router.listen(this.config.PORT, this.config.HOST);

			this.router.log.info(`server listening on ${this.router.server.address().port}`);
		} catch (err) {
			this.router.log.error(err);
			process.exit(1);
		}
	}
}

module.exports = Server;
