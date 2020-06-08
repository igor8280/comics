/**
 * File name - index
 * Description - Utilities/helpers functions
 */

/**
 * create model and fill it with given data
 * @param Model mongoose model
 * @param {Object} data
 * @returns {Object} - new mongoose model
 */

const fillModel = (Model, data) => {
    let model = new Model();
    let schema = model.schema;
    schema.eachPath(path => {
        if (schema.paths[path].isRequired || data.hasOwnProperty(path))
            model[path] = data[path];
    });
    return model;
};

/**
 * Loop through all data object properties and update same properties in Mongoose document retrieved from database
 * @param {Object} doc - mongoose document
 * @param {Object} data - request body
 * @returns {Object} - mongoose document
 */
const updateDocumentData = (doc, data) => {
    // loop through properties and update
    for (let key in data)
        doc[key] = data[key];

    return doc;
};

/**
 * settings for mongo pagination (default/private)
 * @type {{maxLimit: number, defaultLimit: number}}
 */
const _paginationSettings = {
    defaultLimit: 10,
    maxLimit: 100
};
/**
 * validate pagination parameters and generate new object for mongo query
 * @param page
 * @param limit
 * @param sortBy
 * @returns {{limit: number, skip: number, sort: *}}
 */
const getPagination = ({page, limit, sortBy}) => {
     // validate props
    // if page is not set or is lower then 1
    if (!page || page < 1)
        page = 1;
    // if limit is not set use default limit
    if (!limit)
        limit = _paginationSettings.defaultLimit;
    // if limit is lower than 1
    else if (limit < 1)
        limit = 1;
    // if limit is greater then maximum allowed limit
    else if (limit > _paginationSettings.maxLimit)
        limit = _paginationSettings.maxLimit;

    // return object for mongo query
    return {
        limit: parseInt(limit),
        skip: (page - 1) * limit,
        sort: sortBy
    };
};
/**
 * generate pagination object, schema for this object is defined in /src/config/schemas/utils.js -> paginateResponse()
 * @param data {Array}
 * @param limit {Number}
 * @param skip {Number}
 * @param sort {String}
 * @param count {Number}
 * @returns {{total: number, pages: number, limit: number, sortBy: *, page: number, content: Array}}
 */
const paginateResponse = (data, {limit, skip, sort}, count) => {
    return {
        content: data,
        page: (skip / limit) + 1,
        limit,
        total: count,
        pages: Math.ceil(count / limit),
        sortBy: sort
    };
};

module.exports = {
    fillModel,
    updateDocumentData,
    getPagination,
    paginateResponse
};
