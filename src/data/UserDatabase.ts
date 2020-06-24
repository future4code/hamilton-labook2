import BaseDatabase from "./BaseDatabase";
import User from "../models/User";
import { response } from "express";

export default class UserDatabase extends BaseDatabase {
  private static readonly TABLE_NAME: string = "labook_users";

  public async createUser(user: User) {
    await this.getConnection()
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .into(UserDatabase.TABLE_NAME);
  }
  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .where({ email })
      .from(UserDatabase.TABLE_NAME);
    return result[0];
  }
  
}
