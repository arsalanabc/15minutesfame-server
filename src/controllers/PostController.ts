import PostService from "../services/PostService";
import { PostType } from "../types/types";
import * as log from 'log4js'

const logger = log.getLogger('PostController');


const PostController = {
    get: (req: any, response: any) => {
        PostService.get().then(data => {response.send(data)}).catch(err => response.send(err))
    },
   
    create: async (req: any, response: any) => {
        const post: PostType = req.body;

        try {
            const data = await PostService.savePost(post);
            if(data) response.status(200).send(data)

        } catch(e){
                const error = (e as Error)
                response.status(500).send(error.message)
        }
    },

    getCurrentPost: async (req: any, response: any) => {

        try {
            const currentPost  = await PostService.getQueuedPost();
            if(currentPost) response.status(200).send(currentPost)
            else response.status(404).send(currentPost)

        } catch(e){
                const error = (e as Error)
                response.status(500).send(error.message)
        }
    },
}

export default PostController;