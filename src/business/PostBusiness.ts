import Post, { CreatePostDTO, toUserType } from "../models/Post";
import PostDatabase from "../data/PostDatabase";
import IdGenerator from "../services/IdGenerator";
import CustomError from "../err/CustomError";

export default class PostBusiness {
  public async createPost({
    photo,
    description,
    type,
    user_id,
  }: CreatePostDTO) {
    const id = new IdGenerator().generate();

    const postDatabase = new PostDatabase();

    const created_at = new Date();

    const newPost: Post = {
      id,
      photo,
      description,
      created_at,
      type,
      user_id,
    };

    await postDatabase.createPost(newPost);

    return newPost;
  }

  public async getFeed(id: string) {
    const postDatabase = new PostDatabase();
    // const getFeed: Post = {
    //     user_id
    // };
    return await postDatabase.getFeed(id);
  }

  public async getPostType(type: string) {
    const postDatabase = new PostDatabase();

    const postType = await postDatabase.getFeedByType(toUserType(type));

    return postType;
  };

  public async getFeedByTypeAndPage(type: string, page: number) {
    const postDatabase = new PostDatabase();

    const postsPerPage = 3;

    let offset = postsPerPage * (page -1);

    const postType = await postDatabase.getFeedByTypeAndPage(toUserType(type), postsPerPage, offset);

    return postType;
  }

  public async addLike(post_id: string, user_id: string) {
    const postDatabase = new PostDatabase();
    const arrayPost = await postDatabase.getPostLiked(post_id, user_id);

    for (let i = 0; i < arrayPost.length; i++) {
      if (arrayPost[i].post_id === post_id || user_id === user_id) {
        throw new CustomError("You already like this post", 400);
      }
    }
    const addLikePost = await postDatabase.addLike(post_id, user_id);

    return addLikePost;
  }

  public async removeLike(post_id: string, user_id: string) {
    const postDatabase = new PostDatabase();
    const arrayPost = await postDatabase.getPostLiked(post_id, user_id);

    
        if (arrayPost.length === 0) {
          throw new CustomError("You dont like this post, so you can't remove", 400);
        }
      

    const removeLikePost = await postDatabase.removeLike(post_id, user_id)

    return removeLikePost;
  }
}
