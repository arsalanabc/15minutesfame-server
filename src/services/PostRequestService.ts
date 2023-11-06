import PostRequest from "../models/PostRequest";
import UserService from "./UserService";
import {generateRandomString} from "../utils/functions"
import { PostRequestModelType } from "../types/types";

class PostRequestService {
    constructor() {}
    
    async get(){
        return await PostRequest.get();
    }
    
    async getByUniqueCode(code: string) {
        return await PostRequest.getByUniqueCode(code);
    }

    async createAPostRequest(email: string){

        if(email === ""){
            throw Error("Invalid email address")
        }

        await UserService.createUser({email})
        const getUser = await UserService.findUser(email)

        return PostRequest.create({user_id: getUser.id, uniqueCode: generateRandomString(21)})
    }

    async updateRequestStatus(id: number, status: boolean) {
       await PostRequest.updateRequestStatus(id, status);
    }
    
}

export default new PostRequestService();


