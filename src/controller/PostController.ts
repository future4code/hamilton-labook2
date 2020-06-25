import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import CustomError from "../err/CustomError";
import Authenticator from "../services/Authenticator";

export default class PostController {
    public async createPost(request: Request, response: Response) {
        try {
        const { photo, description, type} = request.body;

        const token = request.headers.authorization as string;
         
        const authenticator = new Authenticator();
    
        const user = authenticator.getData(token);

         const newPost = await new PostBusiness().createPost({
            photo, description, type, user_id: user.id 
        });
       
        response.status(200).send({ newPost });
    
        } catch (err) {
        
            if (err instanceof CustomError)
            response.status(err.status).send({ error: err.message });
        else {
            response.status(500).send({ error: err });
            };
        };
    };
    public async getFeed(request: Request, response: Response) {
        try {
        const token = request.headers.authorization as string;

        const authenticator = new Authenticator();

        const userId = authenticator.getData(token);

        const newFeed = await new PostBusiness().getFeed(
            userId.id
        )

        response.status(200).send(newFeed)

        } catch(err) {
        response.status(400).send ({
            message: err.message,
        })
    }
    } 
}