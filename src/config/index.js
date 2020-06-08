/**
 * Project name - starter
 * File name - index
 * Description - Create and export configuration object from {.env} file
 */
// check code version and import specific configuration from hidden file
const ENV = process.env.NODE_ENV || 'development';
const result = require('dotenv').config({ path: __dirname + '/../../.env_' + ENV});

// configuration object parsed from file (.env_[ENVIRONMENT])
const config = Object.assign({
	[ENV]: true,
	env: ENV
}, result.parsed); // envConfig

// required parameters
let requiredParams = ['DATABASE_URL', 'SECRET', 'TOKEN_EXP', 'COOKIE_EXP'];
let missing = requiredParams.filter(param => !config.hasOwnProperty(param));

// check for missing parameters and if any, break the app
if (missing.length) {
	console.log('Missing required environment variables:', missing.join(', '));
	process.exit(1);
}

module.exports = config;
