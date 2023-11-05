import { Application } from 'express-serve-static-core';
import PostController from '../controllers/PostController';
import UserController from '../controllers/UserController';
import { Request, Response } from "express";

export type UserRequest = Express.Request & {
    params: {email: string}
}

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

    app.get('/user/:email', (req: UserRequest, res: Response) => {
        UserController.get(req, res);
    })

    app.post('/user/', (req: Request, res: Response) => {
        UserController.insert(req, res);
    })
}

export default routes