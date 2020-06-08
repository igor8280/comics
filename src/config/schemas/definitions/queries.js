exports.pagination = {
    page: {type: 'number'},
    limit: {type: 'number'},
    sortBy: {type: 'string'}
};

exports.paginationAndSearch = {
    ...exports.pagination,
    search: {type: 'string'}
};
