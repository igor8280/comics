/**
 * Project name - starter
 * File name - ReadService.js
 * Description - Single action service which returns records from database depending of query
 */
class ReadComicsService {
    constructor({ ComicModel, utils }) {
        this.ComicModel = ComicModel;
        this.utils = utils;
    }

    /**
     * Get data method
     * @param query {Object} - Request query object
     * @param character {String} - Name of the comic character
     * @returns {Promise<{total: {type: string},
     *              pages: {type: string}, limit: {type: string}, sortBy: {type: string[]},
     *              page: {type: string}, content: {type: string, items: *}}
     * |{total: number, pages: number, limit: number, sortBy: *, page: number, content: Array}>}
     */
    async execute(character, query) {
        let params = {'lik': character};

        if (query.lists) {
            let content = {};

            // queries
            let edicije = await this.ComicModel.distinct('edicija', params);
            let izdavaci = await this.ComicModel.distinct('izdavac', params);
            let scenaristi = await this.ComicModel.distinct('scenario', params);
            let crtezi = await this.ComicModel.distinct('crtez', params);

            // data
            content.edicije = edicije;
            content.izdavaci = izdavaci;
            content.scenaristi = scenaristi;
            content.crtezi = crtezi;
            return content;
        }

        if (query.naziv) {
            let regex = new RegExp(`^${query.naziv}`, 'gi');
            params.naziv = {'$regex': regex};
        }
        if (query.izdavac)
            params.izdavac = query.izdavac;
        if (query.edicija)
            params.edicija = query.edicija;
        if (query.scenario)
            params.scenario = query.scenario;
        if (query.crtez)
            params.crtez = query.crtez;

        // get pagination for mongo query
        const pagination = this.utils.getPagination(query);

        // run two queries in parallel to get matched count and starters
        const [count, comics] = await Promise.all([
            // count all matched documents
            this.ComicModel.find(params).countDocuments(),

            // find documents using filter and pagination parameters
            this.ComicModel.find(params, null, pagination)
        ]);

        // return data as pagination object
        return this.utils.paginateResponse(comics, pagination, count);
    }
}

module.exports = ReadComicsService;
