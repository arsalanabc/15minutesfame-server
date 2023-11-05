import UserModel from "../models/User";
import { UserRequestType, UserType } from "../types/types";
import * as log from 'log4js'

const logger = log.getLogger('UserService');

class UserService {
    constructor() {}
    
    async findUser(email:string){
        try {
            const user = await UserModel.getByEmail(email);            
            if(user.length === 0){throw new Error("User not found")}
        
            logger.info(`User found for: ${email}`);
            return user[0];
        } catch (error) {
            throw error
        }
    }

    async createUser(user: UserRequestType): Promise<boolean | UserType>{
        try {
            const users = await UserModel.getByEmail(user.email);
            console.log(users)

            if(users.length !== 0) {
                logger.info("User already exists: ", user.email)
                return users[0]
            } else {
                return await UserModel.insert(user);
            }
        
        } catch (error) {
            throw error;
        }
    }
    
}

export default new UserService();