import { Router } from "express";
import RefrehTokenController from "../controller/RefreshTokenController";

const refreshTokenRoute = Router();

refreshTokenRoute.get("/", new RefrehTokenController().getAccessToken);

export default refreshTokenRoute;
