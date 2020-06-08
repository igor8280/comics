/**
 * Project name - starter
 * File name - index.js
 * Description - Authorization with JSON web token implemented in cookie header send with request (handled by the browser).
 */
class Auth {
    constructor({fastify, config, UserModel}) {
        this.fastify = fastify;
        this.config = config;
        this.userModel = UserModel;
        this.lodash = require('lodash');
        this.bcrypt = require('bcrypt');
    }

    /**
     * Check for user in database and validate password.
     * NOTE!!! THIS IS YET TO BE IMPLEMENTED!!!
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     */
     loginHandler = async (req, reply) => {
        let {email, password} = req.body;

        let user = await this.userModel.findOne({email: email});
        if (email === user.email && this.checkPassword(password, user.password)) {
            user = this.lodash.omit(user.toJSON(), ['password']);

            this.setAuthCookies({user}, reply);
            reply.code(200).send({message: 'Login successful.'});
        }
        else
        	reply.errorHandler('NOT_AUTHORIZED');
    }

    async checkPassword(value, hash) {
         return await this.bcrypt.compare(value, hash);
    }

    /**
     * Generate token from value and set two cookies (payload, signature) on reply object
     * @param value {Object} - contains user information retrieved from database
     * @param reply {Object} - Fastify reply object
     */
    setAuthCookies(value, reply) {
        // generate token and split it in three parts
        let [header, data, signature] = this.fastify.jwt.sign(value).split('.');

        // payload cookie should contain first two parts of token
        let payload = header + '.' + data;

        reply.setCookie('payload', payload, {
            // domain: 'localhost', // if omitted, defaults to the host of the current document URL, not including subdomains.
            path: '/',
            expires: new Date(Date.now() + parseInt(this.config.COOKIE_EXP)), // expires in 30min
            // secure: true, // send only on https request
            sameSite: 'Strict'  // CSRF protection
        });

        reply.setCookie('signature', signature, {
            // this is stored as session cookie (no expires prop)
            path: '/',
            // secure: true, // send only on https request
            httpOnly: true, // XSS protection
            sameSite: 'Strict' // CSRF protection
        });
    }

    /**
     * Validation token function
     * @param request {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     */
    validateUser = async (request, reply) => {
        // extract payload and signature from cookies
        let {payload, signature} = request.cookies;
        // join payload and signature to get full token
        let token = payload + '.' + signature;
        try {
            // verify token
            await this.fastify.jwt.verify(token);
        }
        catch (error) {
            // token is valid but is expired
            if (error.name === 'TokenExpiredError') {
                // decode token data
                let data = this.fastify.jwt.decode(token);
                // now user should be searched in database to check if he is not removed or blacklisted
                // and if user passes validation then token should be regenerated otherwise return 401 error
                // delete time props from old token
                delete data.iat;   // issued at time
                delete data.exp;   // expiration time

                // regenerate token with new expiration time
                this.setAuthCookies(data, reply);
            }
            else
                reply.errorHandler('NOT_AUTHORIZED');
        }
    }
}

module.exports = Auth;
