import { Application } from 'express-serve-static-core';
import PostController from '../controllers/PostController';
import UserController from '../controllers/UserController';
import { Request, Response } from "express";
import UserRoutes from './UserRoutes';

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

    UserRoutes(app)
}

export default routes