import PostModel from "../models/Post";
import PostTypeModel from "../models/PostType";
import UserModel from "../models/User";
import { PostType } from "../types/types";
import PostRequestService from "./PostRequestService";

class PostService {
    constructor() {}
    
    async get(){
        return await PostModel.get();
    }

    async savePost(post: PostType){
        if(post.uniqueCode == "" || post.link == "" ) {
            throw new Error("Invalid data type")
        }

        const {uniqueCode, link, postType} = post;

        const postRequest = await PostRequestService.getByUniqueCode(uniqueCode);

        if(postRequest.length === 0){
            throw new Error("No request found!")
        }

        const {user_id, expires_at, is_submitted} = postRequest[0];

        if(this.isExpired(expires_at.toDateString())){
            throw new Error("Request is expired")
        }

        if(is_submitted){
            throw new Error("Request is already submitted!")
        }


        const user = await UserModel.getById(user_id.toString());
        const postTypeModel = await PostTypeModel.getByType(postType);

        const { id } = postTypeModel[0]

        if(user.length === 0) {
            throw new Error("User not found!")
        }

        await PostRequestService.updateRequestStatus(postRequest[0].id, true)
            
        return await PostModel.insert(
            {
                user_id, 
                unique_code: uniqueCode, 
                post_type_id: id,
                title: "",
                link
            });

    }
    
    isExpired(expiresAt: string){    
        return new Date() < new Date(expiresAt);
    }
}

export default new PostService();