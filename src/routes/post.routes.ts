import { Router } from "express";
import PostController from "../controller/PostController";

const postRouter = Router();

postRouter.post("/createpost", new PostController().createPost);
postRouter.post("/addlike", new PostController().addLike);
postRouter.delete("/removelike", new PostController().removeLike);
postRouter.get("/getfeed", new PostController().getFeed);
postRouter.get("/getfeedbytype", new PostController().getFeedByType);


export default postRouter;
