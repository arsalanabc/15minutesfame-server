import PostModel from "../models/Post";
import { PostType } from "../types/types";

class PostService {
    constructor() {}
    
    async get(){
        return await PostModel.get();
    }

    async savePost(post: PostType){
        return await PostModel.insert(post);
    }
    
    
}

export default new PostService();