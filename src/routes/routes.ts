import { Application } from 'express-serve-static-core';
import PostController from '../controllers/PostController';
import UserRoutes from './UserRoutes';
import PostRequestController from '../controllers/PostRequestController';

export type UserRequest = Express.Request & {
    params: {email: string}
}

function routes(app: Application) {
    app.get('/post', (req: Express.Request, res: Express.Response) => {
        PostController.get(req, res);
    })

    app.post('/post', (req: Express.Request, res: Express.Response, next) => {
        try {
            PostController.create(req, res);            
        } catch (error) {
           console.error(error)
        }
    });

    app.post('/post-request', PostRequestController.request);
    app.get('/post-request', PostRequestController.get);
    app.get('/post-request/:uniqueCode', PostRequestController.getByCode);

    UserRoutes(app)
}

export default routes