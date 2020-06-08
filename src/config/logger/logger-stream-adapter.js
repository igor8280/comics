/**
 * Created by Igor Gojkovic on 18/06/2019 - 19:52
 * Project name - demo-app
 * File name - logger-stream-adapter
 * Description -
 */
const LoggerStreamAdapter = {
	toStream(logger) {
		return {
			write(message) {
				logger.info(message.slice(0, -1));
			}
		};
	}
};

module.exports = LoggerStreamAdapter;
