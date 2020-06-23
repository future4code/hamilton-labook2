import userRoute from "./user.routes";
import postRoute from "./post.routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/post", postRoute);

export default routes;
