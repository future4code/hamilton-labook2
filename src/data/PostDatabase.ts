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
    .into(PostDatabase.TABLE_NAME);
  };

  public async getFeed(id: string): Promise<any> {

    const feed =  await this.getConnection().raw (
      `
      SELECT labook_users.name, labook_posts.created_at, labook_posts.description, labook_posts.photo
      FROM labook_posts
      JOIN labook_users
      ON labook_posts.user_id = labook_users.id
      WHERE labook_posts.user_id IN (
      SELECT friend_id 
      FROM labook_relationship
      WHERE user_id = "${id}")
      OR labook_posts.user_id IN (
      SELECT user_id 
      FROM labook_relationship
      WHERE friend_id = "${id}");
      `
    )
        return feed[0]
  }
}
