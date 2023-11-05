import PostService from "../services/PostService";
import { PostType } from "../types/types";
import * as log from 'log4js'

const logger = log.getLogger('PostController');


const PostController = {
    get: (req: any, response: any) => {
        PostService.get().then(data => {response.send(data)}).catch(err => response.send(err))

    },
   
    create: (req: any, response: any) => {
        const post: PostType = req.body;
        PostService.savePost(post).then(data => {
            if(data){
                response.send(data)
            } else {
                response.status('400')
            }
        });
    },
}

export default PostController;