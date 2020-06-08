/**
 * Project name - starter
 * File name - index.js
 * Description - Import fastify instance and add necessary plugins
 * https://www.npmjs.com/package/fastify
 * https://www.npmjs.com/package/pino
 * https://www.npmjs.com/package/ajv
 * https://www.npmjs.com/package/fastify-helmet
 * https://www.npmjs.com/package/fastify-cookie
 * https://www.npmjs.com/package/fastify-oas
 * https://www.npmjs.com/package/fastify-jwt
 */
// Import fastify, setup for logger (pino), setup for third party serializer
const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    logger: {
        prettyPrint: true,
        // file: '/home/igor/starter.log'
    },
    ajv: {
        customOptions: {
            removeAdditional: 'all'
        }
    }
});

const helmet = require('fastify-helmet');
const cookie = require('fastify-cookie');
// Import Swagger Options
const swagger = require('../../swagger');

module.exports = ({config}) => {
    // security headers
    fastify.register(helmet);

    // cookie handler
    fastify.register(cookie);

    // add swagger documentation - set host and port
    swagger.options.swagger.host = `${config.HOST}:${config.PORT}`;
    fastify.register(require('fastify-oas'), swagger.options);

    // add JSON web token
    fastify.register(require("fastify-jwt"), {
    	secret: config.SECRET,
        sign: {
            expiresIn: config.TOKEN_EXP
        }
    });

    // allow CORS
    fastify.register(require('fastify-cors'), { origin: '*' });

    return fastify;
};
