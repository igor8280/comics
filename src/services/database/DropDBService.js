/**
 * Project name - starter
 * File name - DropDBService.js
 * Description - Single action service which drops database (NOTE!!! - Used for testing purposes only!!!)
 */
class DBDrop {
    constructor({ dbConn }) {
        this.dbConn = dbConn;
    }

    /**
     * Drop mongo database (to which is connected)
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     * @returns {Promise<Object>}
     */
    execute = async (req, reply) => {
        try {
            await this.dbConn.dropDB();
            reply.status(200).send({message: 'Database dropped!'});
        } catch (error) {
            reply.status(500).send({message: error});
        }
    };
}

module.exports = DBDrop;
