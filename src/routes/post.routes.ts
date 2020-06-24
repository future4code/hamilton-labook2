import { Router } from "express";
import PostDatabase from "../data/PostDatabase";
import CustomError from "../err/CustomError";
import IdGenerator from "../services/IdGenerator";
import Post from "../models/Post";
import Authenticator from "../services/Authenticator";
import moment  from "moment"

const postRouter = Router();

postRouter.post("/post", async(request, response) => {
    try {
    const { photo, description, type } = request.body;
    
    const token = request.headers.auth as string;

    const authenticator = new Authenticator();

    const authorId = authenticator.getData(token);

    const id = new IdGenerator().generate();
    
    const postDatabase = new PostDatabase();

    const created_at = new Date();

    const newPost: Post = {
        id, 
        photo,
        description,
        created_at,
        type,
        user_id: authorId.id
    };

    await postDatabase.createPost(newPost);

    response.status(200).send({ newPost })

    } catch (err) {
    
        if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
    else {
        response.status(500).send({ error: err });
    }
    }
})

export default postRouter;
