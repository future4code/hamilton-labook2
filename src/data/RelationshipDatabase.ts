import BaseDatabase from "./BaseDatabase";


export default class RelationshipDatabase extends BaseDatabase {
  private static readonly TABLE_NAME: string = "labook_relationship";

  public async makeFriendship(friend_id:string, user_id: string):Promise<any>{
    const result = await this.getConnection()
    .insert({
      friend_id,
      user_id
    })
    .into(RelationshipDatabase.TABLE_NAME)

    return(result)
  }

  public async getFriendById(user_id: string):Promise<any>{
    const result = await this.getConnection()
    .select ("friend_id")
    .from(RelationshipDatabase.TABLE_NAME)
    .where ({ user_id: user_id})

    return result
  }

  public async deleteFriendship(user_id: string, friend_id: string):Promise<void>{
    await this.getConnection().raw (
      `
      DELETE
      FROM labook_relationship
      WHERE user_id = "${user_id}"
      AND friend_id = "${friend_id}"
      `
    )
  }
}