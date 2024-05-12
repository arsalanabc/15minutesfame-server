import { Application } from 'express-serve-static-core';
import PostController from '../controllers/PostController';
import UserRoutes from './UserRoutes';
import PostRequestController from '../controllers/PostRequestController';
import QueueController from '../controllers/QueueController';

export type UserRequest = Express.Request & {
    params: {email: string}
}

function routes(app: Application) {
    app.get('/post/current', PostController.getCurrentPost)
    app.get('/post/:postId', PostController.get)
    app.post('/post', PostController.create);

    app.post('/post-request', PostRequestController.request);
    app.get('/post-request', PostRequestController.get);
    app.get('/post-request/:uniqueCode', PostRequestController.getByCode);

    app.put('/queue', QueueController.update);
    
    UserRoutes(app)
}

export default routes