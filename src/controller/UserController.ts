import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import CustomError from "../err/CustomError";
import Authenticator from "../services/Authenticator";

export default class UserController {
  public async deleteFriendship(request: Request, response: Response) {
    try {
      const deleteFriendId = {
        id: request.body.friend_id,
      };
      const token = request.headers.authorization as string;

      if (!token || !deleteFriendId) {
        throw new CustomError("Invalid token or id", 400);
      }

      const authenticator = new Authenticator();
      const user = authenticator.getData(token);

      await new UserBusiness().deleteFriendship({
        friend_id: deleteFriendId.id,
        user_id: user.id,
      });

      response.status(200).send({
        message: "Successfully deleted",
      });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }

  public async makeFriendship(request: Request, response: Response) {
    try {
      const userToMakeFriendship = {
        id: request.body.friend_id,
      };

      const token = request.headers.authorization as string;

      const authenticator = new Authenticator();
      const user = authenticator.getData(token);

      await new UserBusiness().makeFriendship({
        friend_id: userToMakeFriendship.id,
        user_id: user.id,
      });

      response.status(200).send({
        message: "Friendship successfully",
      });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }

  public async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const token = await new UserBusiness().login({
        email,
        password,
      });

      response.status(200).send({ token });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }

  public async signUp(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const token = await new UserBusiness().signUp({
        name,
        email,
        password,
      });

      response.status(200).send({ token });
    } catch (err) {
      if (err instanceof CustomError)
        response.status(err.status).send({ error: err.message });
      else {
        response.status(500).send({ error: err });
      }
    }
  }
}
