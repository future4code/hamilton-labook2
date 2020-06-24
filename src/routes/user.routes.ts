import { Router } from "express";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import UserDatabase from "../data/UserDatabase";
import User from "../models/User";
import CustomError from "../err/CustomError";
import RelationshipDatabase from "../data/RelationshipDatabase";

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

userRoute.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const userDatabase = new UserDatabase();

    const user = await userDatabase.getUserByEmail(email);

    if (!user) throw new CustomError("Email or password is incorrect", 400);

    const correctPassword = await new HashManager().compare(
      password,
      user.password
    );

    if (!correctPassword)
      throw new CustomError("Email or password is incorrect", 400);

    const token = new Authenticator().generateToken({ id: user.id });

    response.status(200).send({ token });
  } catch (err) {
    
    if (err instanceof CustomError)
      response.status(err.status).send({ error: err.message });
    else {
      response.status(500).send({ error: err });
    }
  }
});

userRoute.post("/makefriendship", async (request, response)=>{
  try{
    const userToMakeFriendship = {
      id: request.body.friend_id
    };

    const token = request.headers.authorization as string;

    const authenticator = new Authenticator();
    const user = authenticator.getData(token);

    const RelationshipDb = new RelationshipDatabase();
    const userFriends = await RelationshipDb.getFriendById(user.id);

    for(let i = 0; i < userFriends.length; i++){
      if(userFriends[i].friend_id === userToMakeFriendship.id){
        throw new CustomError("You are already friends", 400)
      }

    }
    // console.log(userFriends);
    
    await RelationshipDb.makeFriendship(userToMakeFriendship.id, user.id);

    response.status(200).send({
      message: "Friendship successfully"
    });
  } catch(error){
    response.status(400).send({message: error.message});
  }

})

userRoute.delete("/deletefriendship", async (request, response)=>{
  try{
    const deleteFriendId = {
      id: request.body.friend_id
    };
    const token = request.headers.authorization as string;

    if(!token || !deleteFriendId){
      throw new CustomError("Invalid token or id", 400)
    }

    const authenticator = new Authenticator();
    const user = authenticator.getData(token);

    const RelationshipDb = new RelationshipDatabase();
    const userFriend = await RelationshipDb.getFriendById(user.id);

    if(!userFriend){
      throw new CustomError("Invalid", 400);
    }
    await RelationshipDb.deleteFriendship(user.id, deleteFriendId.id);
    
    response.status(200).send({
      message: "Successfully deleted"
    });

  }catch(error){
    response.status(400).send({message: error.message});
  }
})


export default userRoute;
