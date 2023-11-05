import client from "../db";
import * as log from 'log4js'
import { UserType } from "../types/types";

const errorsLogger = log.getLogger('errors');
const logger = log.getLogger('UserModel');

const UserModel = {
    insert: async (user:UserType): Promise<boolean> => {
        
        if(user == null ) {
            throw new Error('missing argument');
        };

        const query = 'INSERT INTO author (email) VALUES ($1)';
        logger.info(`Executing: ${query}`);

        return await client.query(
            query,
            [user.email])
            .then(res => {
                logger.info(`Query finished: ${query}`);
                return res.rowCount>0?true:false;
            })
            .catch(e => {
                errorsLogger.fatal(e);
                throw e;
            });
    },

    getByEmail: async (email:string) => {

        const query = 'SELECT * FROM "author" WHERE email = $1';
        const values = [email];
        try {
            const result = await client.query(query, values);

            logger.info(`Executing: ${query}`);

            if (result.rows.length === 0) {
                throw new Error('User not found');
            }
        
            logger.info(`User found for: ${email}`);
            return result.rows[0];

        } catch (error) {
            errorsLogger.fatal(error);
            throw error;
            }
        },
}

export default UserModel;