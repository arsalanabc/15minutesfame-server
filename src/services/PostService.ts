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

        PostRequestService.validateRequest(postRequest[0]);    
        
        const {user_id, id} = postRequest[0];
        const user = await UserModel.getById(user_id.toString());
        const postTypeModel = await PostTypeModel.getByType(postType);

        if(user.length === 0) {
            throw new Error("User not found!")
        }

        await PostRequestService.updateRequestStatus(id, true)
            
        return await PostModel.insert(
            {
                user_id, 
                unique_code: uniqueCode, 
                post_type_id: postTypeModel[0].id,
                title: "",
                link
            });

    }
}

export default new PostService();