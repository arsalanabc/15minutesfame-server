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

    validateRequest(postRequest:PostRequestModelType){
        
        const {expires_at, is_submitted} = postRequest;

        if(this.isExpired(expires_at.toDateString())){
            throw new Error("Request is expired")
        }

        if(is_submitted){
            throw new Error("Request is already submitted!")
        }
    }
    
    private isExpired(expiresAt: string){    
        return new Date() < new Date(expiresAt);
    }
}

export default new PostRequestService();


