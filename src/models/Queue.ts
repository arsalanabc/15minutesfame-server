import client from "../db";
import * as log from 'log4js'
import { UserRequestType, QueueModelType } from "../types/types";

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('QueueModel');

const QueueModel = {
    get: async (): Promise<QueueModelType[]> => {

        const query = `SELECT * FROM "queue"`;
        try {
            const result = await client.query(query);

            logger.info(`Executing: ${query}`);

            return result.rows

        } catch (error) {
            errorsLogger.fatal(error);
            throw error;
            }
        },
}

export default QueueModel;