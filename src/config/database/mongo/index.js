/**
 * Project name - starter
 * File name - index
 * Description - Create Mongoose connection with mongo database
 */
const mongoose = require('mongoose');
const { updateIfCurrentPlugin } = require('mongoose-update-if-current');

/* Global plugins */
mongoose.plugin(updateIfCurrentPlugin); // include plugin for concurrency control

class DBConnection {
    constructor({config}) {
        this.config = config;
    }

    // create mongoDB connection
    async connectDB() {
        try {
            await mongoose.connect(`${this.config.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            console.log('error', error);
            // handleError(error);
        }
    }

    // drop database
    async dropDB() {
        try {
            await mongoose.connection.dropDatabase();
        } catch (error) {
            console.log('DROP DB ERROR', error);
        }
    }
}

module.exports = DBConnection;
