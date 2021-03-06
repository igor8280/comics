/**
 * Project name - starter
 * File name - StarterController.js
 * Description - (Starter) Controller handling request
 */
class StarterController {
    constructor({ starterService }) {
        this.service = starterService;
    }

    /**
     * POST handler method
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     * @returns {Promise<{Object}>}
     */
     create = async (req, reply) => {
        try {
            let data = await this.service.create.execute(req.body);
            reply.status(200).send(data);
        } catch (error) {
            reply.errorHandler(error);
        }
    };

    /**
     * GET handler method
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     * @returns {Promise<{Object}>}
     */
     read = async (req, reply) => {
        try {
            let data = await this.service.read.execute(req.query);
            reply.status(200).send(data);
        } catch (error) {
            reply.errorHandler(error);
        }
    };

    /**
     * GET/:id handler method
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     * @returns {Promise<{Object}>}
     */
     readOne = async (req, reply) => {
        try {
            let data = await this.service.readOne.execute(req.params.id);
            reply.status(200).send(data);
        } catch (error) {
            reply.errorHandler(error);
        }
    };

    /**
     * PUT/:id handler method
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     * @returns {Promise<{Object}>}
     */
     update = async (req, reply) => {
        try {
            let data = await this.service.update.execute(req.params.id, req.body);
            reply.status(200).send(data);
        } catch (error) {
            reply.errorHandler(error);
        }
    };

    /**
     * DELETE handler method
     * @param req {Object} - Fastify request object
     * @param reply {Object} - Fastify reply object
     * @returns {Promise<{Object}>}
     */
     delete = async (req, reply) => {
        try {
            let data = await this.service.delete.execute(req.params.id);
            reply.status(200).send(data);
        } catch (error) {
            reply.errorHandler(error);
        }
    };
}


module.exports = StarterController;
