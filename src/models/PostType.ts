import client from "../db";
import * as log from 'log4js'

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('PostTypeModel');

const PostTypeModel = {
    getByType: async (type: string) => {
        const query = 'select * from post_type WHERE post_type = $1';
        logger.info(`Executing: ${query}`);
        return await client.query(query, [type])
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

export default PostTypeModel;