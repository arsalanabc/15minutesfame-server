import client from "../db";
import * as log from 'log4js'
import { PostSaveType } from "../types/types";

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('PostModel');

const PostModel = {
    insert: async (post:PostSaveType): Promise<boolean> => {
        
        if(post == null ) {
            throw new Error('missing argument');
        };

        const query = 'INSERT INTO post (link) VALUES ($1)';
        logger.info(`Executing: ${query}`);

        return await client.query(
            query,
            [post.link])
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
        const query = 'select * from post';
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
}

export default PostModel;