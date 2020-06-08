/**
 * Created by Igor Gojkovic on 18/06/2019 - 19:50
 * Project name - demo-app
 * File name - index
 * Description -
 */
const Log4js = require('log4js');

module.exports = ({ config }) => {
	Log4js.configure(config.logging);

	return Log4js.getLogger();
};
