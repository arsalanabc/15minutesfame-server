import PostModel from "../models/Post";
import UserModel from "../models/User";
import { UserType } from "../types/types";

class UserService {
    constructor() {}
    
    async findUser(email:string){
        return await UserModel.getByEmail(email);
    }

    async createUser(user: UserType){
        return await UserModel.insert(user);
    }
    
    
}

export default new UserService();