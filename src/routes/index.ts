import userRoute from "./user.routes";
import postRoute from "./post.routes";
import refreshTokenRoute from "./refreshToken.routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/post", postRoute);
routes.use("/refreshtoken", refreshTokenRoute);

export default routes;
