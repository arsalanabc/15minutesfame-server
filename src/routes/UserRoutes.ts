import { Application } from 'express-serve-static-core';
import PostController from '../controllers/PostController';
import UserController from '../controllers/UserController';
import { Request, Response } from "express";

export type UserRequest = Express.Request & {
    params: {email: string}
}

function UserRoutes(app: Application) {
    app.get('/user/:email', UserController.get)
    app.post('/user/', UserController.insert)
}

export default UserRoutes