import client from "../db";
import * as log from 'log4js'
import { UserRequestType, QueueModelType } from "../types/types";

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('QueueModel');

const QueueModel = {
    get: async (): Promise<QueueModelType> => {

        const query = `SELECT * FROM "queue"`;
        try {
            const result = await client.query(query);

            logger.info(`Executing: ${query}`);

            return result.rows[0]

        } catch (error) {
            errorsLogger.fatal(error);
            throw error;
            }
        },
        
        udpate: async (queueItem: QueueModelType): Promise<void> => {
            const {id, post_id, expiring_time, updated_at} = queueItem;
            const query = 'UPDATE "queue" SET post_id = $1, expiring_time = $2, updated_at = $3 WHERE id = $4';
            const values = [post_id, expiring_time, updated_at, id];
            await client.query(query, values);
        }
}

export default QueueModel;