import { Application } from 'express-serve-static-core';
import PostController from '../controllers/PostController';

function routes(app: Application) {
    app.get('/post', (req: Express.Request, res: Express.Response) => {
        PostController.get(req, res);
    })

    app.post('/post', (req: Express.Request, res: Express.Response, next) => {
        try {
            PostController.insert(req, res);            
        } catch (error) {
           console.error(error)
        }
    });
}

export default routes