import { Router } from "express";
import PostController from "../controller/PostController";

const postRouter = Router();

postRouter.post("/", new PostController().createPost);
postRouter.get("/getfeed", new PostController().getFeed);
postRouter.get("/getfeedbytype", new PostController().getFeedByType);

export default postRouter;
