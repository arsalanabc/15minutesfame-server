import client from "../db";
import * as log from 'log4js'
import { PostModelType, PostSaveType } from "../types/types";

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('PostModel');

const PostModel = {
    insert: async (post:PostSaveType): Promise<boolean> => {
        
        if(post == null ) {
            throw new Error('missing argument');
        };

        const query = 'INSERT INTO post (title, user_id, post_type_id, unique_code, link) VALUES ($1, $2, $3, $4, $5)';
        logger.info(`Executing: ${query}`);

        return await client.query(
            query,
            [post.title, post.user_id, post.post_type_id, post.unique_code, post.link])
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

    currentPost: async () => {
        const query = 'select post from queue INNER JOIN post ON queue.post_id = post.id';
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

    getById: async (id:string): Promise<PostModelType> => {

        const query = `SELECT * FROM "post" WHERE id = $1`;
        const values = [id];
        try {
            const result = await client.query(query, values);

            logger.info(`Executing: ${query}`);

            return result.rows[0]

        } catch (error) {
            errorsLogger.fatal(error);
            throw error;
            }
        },
}

export default PostModel;