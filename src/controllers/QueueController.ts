import QueueModel from "../models/Queue";
import PostService from "../services/PostService";
import * as log from 'log4js'
import QueueService from "../services/QueueService";

const logger = log.getLogger('QueueController');


const QueueController = {
    update: (req: any, response: any) => {
        QueueService.updateQueueWithNextPost()
        .then(data => {response.send("Queue updated")})
        .catch(err => response.status(404).send(err.message))
    },
   
}

export default QueueController;