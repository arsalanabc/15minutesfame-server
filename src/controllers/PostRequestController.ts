import PostRequestService from "../services/PostRequestService";
import { PostResquestRequest, UserRequestType } from "../types/types";
import * as log from 'log4js'

const logger = log.getLogger('PostController');


const PostRequestController = {
    get: (req: any, response: any) => {
        PostRequestService.get().then(data => {response.send(data)}).catch(err => response.send(err))

    },

    getByCode: async (req: PostResquestRequest, response: any) => {
        if(!req.params || !req.params.uniqueCode) {
            response.status(400).send(new Error("invalid request"))
        }

        try {
            const postRequest = await PostRequestService.getByUniqueCode(req.params.uniqueCode)  
            PostRequestService.validateRequest(postRequest[0]);    
            
            if(postRequest.length === 0) {
                response.status(404).send("No Post Request found")
                return 
            }      

            response.send(postRequest);
        } catch (e) {
            const error = (e as Error)
            response.status(500).send(error.message)
        }
    
    },
   
    request: async (req: any, response: any, next: Function) => {
        const postRequest: UserRequestType = req.body;
        try {
            const data = await PostRequestService.createAPostRequest(postRequest.email)
            response.status(200).send(data)
        } catch (e) {
            const error = (e as Error)
            response.status(500).send(error.message)
        }
    },

}

export default PostRequestController;