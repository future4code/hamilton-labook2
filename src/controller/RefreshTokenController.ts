import { Request, Response } from "express";
import RefreshTokenBusiness from "../business/RefreshTokenBusiness";
import CustomError from "../err/CustomError";

export default class RefreshTokenController {
  public async getAccessToken(request: Request, response: Response) {
    const refreshToken = request.headers.authorization;

    try {
      if (!refreshToken)
        throw new CustomError("Refresh Token is missing or undefined", 401);

      const accessToken = await new RefreshTokenBusiness().getAccessToken(
        refreshToken
      );

      response.status(200).send({ accessToken });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }
}
