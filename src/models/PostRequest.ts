import client from "../db";
import * as log from 'log4js'
import { PostReqestType, PostRequestModelType } from "../types/types";

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('PostModel');

const PostRequest = {
    create: async (postRequest:PostReqestType): Promise<boolean> => {
        
        if(postRequest == null ) {
            throw new Error('missing argument');
        };

        const query = 'INSERT INTO post_request (user_id, unique_code) VALUES ($1, $2)';
        logger.info(`Executing: ${query}`);

        return await client.query(
            query,
            [postRequest.user_id, postRequest.uniqueCode])
            .then(res => {
                logger.info(`Query finished: ${query}`);
                return res.rowCount>0?true:false;
            })
            .catch(e => {
                errorsLogger.fatal(e);
                throw e;
            });
    },

    get: async () => {
        const query = 'select * from post_request';
        logger.info(`Executing: ${query}`);
        return await client.query(query)
            .then(res => {
                logger.info(`Data returned for: ${query}`);
                return res.rows;
            })
            .catch(e => {
                errorsLogger.fatal(e);
                throw e;
            });
        },

    getByUniqueCode: async (code:string) : Promise<PostRequestModelType[]> => {
        const query = 'SELECT * FROM "post_request" WHERE unique_code = $1';

        logger.info(`Executing: ${query}`);
        return await client.query(query, [code])
            .then(res => {
                logger.info(`Data returned for: ${query}`);
                return res.rows;
            })
            .catch(e => {
                errorsLogger.fatal(e);
                throw e;
            });
        },

    async updateRequestStatus(requestId: number, isSubmitted: boolean ): Promise<void> {
    
            const query = 'UPDATE "post_request" SET is_submitted = $1 WHERE id = $2';
            const values = [isSubmitted, requestId];
            await client.query(query, values);
       
    }
}

export default PostRequest;