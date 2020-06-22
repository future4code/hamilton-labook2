import { Router } from "express";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import UserDatabase from "../data/UserDatabase";
import User from "../models/User";
import CustomError from "../err/CustomError";

const userRoute = Router();

userRoute.post("/signup", async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const userDatabase = new UserDatabase();

    const userExist = await userDatabase.getUserByEmail(email);

    if (userExist) throw new CustomError("Email already in use", 400);

    const id = new IdGenerator().generate();

    const hashedPassword = await new HashManager().hash(password);

    const userData: User = {
      id,
      name,
      email,
      password: hashedPassword,
    };

    const token = new Authenticator().generateToken({ id });

    await userDatabase.createUser(userData);

    response.status(200).send({ token });
  } catch (err) {
    if (err instanceof CustomError)
      response.status(err.status).send({ error: err.message });
    else {
      response.status(500).send({ error: err });
    }
  }
});

export default userRoute;
