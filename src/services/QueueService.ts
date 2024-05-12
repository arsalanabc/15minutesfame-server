import { NOTFOUND } from "dns";
import QueueModel from "../models/Queue";
import { PostModelType, QueueModelType } from "../types/types";
import PostService from "./PostService";

const fifteenMinutesInMilliseconds = 15 * 60 * 1000;

class QueueService {
    constructor() {}
    
    async get(){
        return await QueueModel.get();
    }

    async updateQueueWithNextPost(){
        const inQueue: QueueModelType =  await QueueModel.get();
        const post: PostModelType = await PostService.getNextPost(inQueue.post_id)
    
        const now = new Date();
        const updateQueue:QueueModelType = {...inQueue, 
            post_id: post.id.toString(),
            expiring_time: new Date(now.getTime() + fifteenMinutesInMilliseconds),
            updated_at: now
        }
        await QueueModel.udpate(updateQueue);
       
    }
}

export default new QueueService();