import QueueModel from "../models/Queue";

class QueueService {
    constructor() {}
    
    async get(){
        return await QueueModel.get();
    }
}

export default new QueueService();