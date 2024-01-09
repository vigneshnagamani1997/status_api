import mongoose from 'mongoose';
import * as DotEnv from 'dotenv';
DotEnv.config();
const MONGO_URL = process.env.MONGO_URL // DB URI


export class databaseConnection {
    constructor() {
        this.mongooseDb();
    }

    mongooseDb() {
        mongoose.Promise = Promise;
        mongoose.connect(MONGO_URL);
        mongoose.connection.on('error', (error: Error) => console.error(error));
    }

}