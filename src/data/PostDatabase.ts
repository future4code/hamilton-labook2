import BaseDatabase from "./BaseDatabase";
import Post from "../models/Post";


export default class PostDatabase extends BaseDatabase {
  private static readonly TABLE_NAME: string = "labook_posts";

  public async createPost (post: Post) {
    
    await this.getConnection()
    .insert({
      id: post.id,
      photo: post.photo,
      description: post.description,
      created_at: post.created_at,
      type: post.type,
      user_id: post.user_id
    })
    .into(PostDatabase.TABLE_NAME)
  }
}
