const body = require('./body');
const params = require('./params');
const query = require('./query');
const response = require('./response');

module.exports = [].concat(body, params, query, response);
