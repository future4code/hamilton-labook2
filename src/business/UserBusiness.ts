import RelationshipDatabase from "../data/RelationshipDatabase";
import CustomError from "../err/CustomError";
import User, {
  DeleteFriendshipDTO,
  MakeFriendshipDTO,
  loginDTO,
  signUpDTO,
} from "../models/User";
import UserDatabase from "../data/UserDatabase";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";

export default class UserBusiness {
  public async deleteFriendship({ friend_id, user_id }: DeleteFriendshipDTO) {
    if (!friend_id) {
      throw new CustomError("Please insert a correct Id", 400);
    }

    const RelationshipDb = new RelationshipDatabase();
    const userFriends = await RelationshipDb.getFriendById(user_id);

    for (let i = 0; i < userFriends.length; i++) {
      if (userFriends[i].friend_id === friend_id) {
        await RelationshipDb.deleteFriendship(user_id, friend_id);

        return;
      }
    }
    throw new CustomError("This user is not your friend.", 400);
  }

  public async makeFriendship({ friend_id, user_id }: MakeFriendshipDTO) {
    if (!friend_id) {
      throw new CustomError("Plase insert a correct Id", 400);
    }

    if (user_id === friend_id) {
      throw new CustomError("You cannot add yourself", 400);
    }

    const RelationshipDb = new RelationshipDatabase();
    const userFriends = await RelationshipDb.getFriendById(user_id);

    for (let i = 0; i < userFriends.length; i++) {
      if (userFriends[i].friend_id === friend_id) {
        throw new CustomError("You are already friends", 400);
      }
    }
    console.log(friend_id, user_id);
    await RelationshipDb.makeFriendship(friend_id, user_id);
  }

  public async login({ email, password }: loginDTO) {
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

    return token;
  }

  public async signUp({ name, email, password }: signUpDTO){

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

    return(token)

  }
}
