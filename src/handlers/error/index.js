/**
 * Project name - starter
 * File name - index.js
 * Description - Custom error handler
 */
const codes = require('./codes');

class ErrorHandler {
    handle(arg) {
        let error = {
            status: 500
        };

        if (typeof arg === 'string' && codes.hasOwnProperty(arg)) {
            error = codes[arg];
        } else if (arg instanceof Error && codes.hasOwnProperty(arg.name)) {
            error = codes[arg.name];
        } else if (arg instanceof Error && codes.hasOwnProperty(arg.name + arg.code)) {
            error = codes[arg.name + arg.code];
        }

        return error;
    }
}

module.exports = ErrorHandler;
