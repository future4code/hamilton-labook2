import { Router } from "express";
import UserController from "../controller/UserController";

const userRoute = Router();

userRoute.post("/signup", new UserController().signUp);

userRoute.post("/login", new UserController().login);

userRoute.post("/makefriendship", new UserController().makeFriendship);

userRoute.delete("/deletefriendship", new UserController().deleteFriendship);

export default userRoute;
