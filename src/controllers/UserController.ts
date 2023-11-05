import { UserRequest } from "../routes/routes";
import { Response, Request } from "express";
import UserService from "../services/UserService";
import {UserType } from "../types/types";
import * as log from 'log4js'

const logger = log.getLogger('UserController');


const UserController = {
    get: async (req: UserRequest, response: Response, next: Function) => {
        if(!req.params || !req.params.email) {
            response.send(new Error("invalid request"))
        }
        
        logger.info("Requested User: ", req.params.email)
        try {
            const user = await UserService.findUser(req.params.email)

            if(user) response.send(user)
        } catch (e) {
            const error = (e as Error)
            response.status(404).send(error.message)
        }
    },
   
    insert: async (req: Request, response: any, next: Function) => {
        const user: UserType = req.body;
    
        try {
            const data = await UserService.createUser(user);
            response.send(data)
        } catch (e) {
            const error = (e as Error)
            response.status(500).send(error.message)
        }
    },
}

export default UserController;