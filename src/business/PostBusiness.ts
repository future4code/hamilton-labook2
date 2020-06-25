import Post, {
    CreatePostDTO, toUserType
} from "../models/Post";
import PostDatabase from "../data/PostDatabase";
import IdGenerator from "../services/IdGenerator";

export default class PostBusiness {
    public async createPost({photo, description, 
         type, user_id}: CreatePostDTO) {         
             const id = new IdGenerator().generate();
             
             const postDatabase = new PostDatabase();
         
             const created_at = new Date();
         
             const newPost: Post = {
                 id, 
                 photo,
                 description,
                 created_at,
                 type,
                 user_id
             };
         
             await postDatabase.createPost(newPost);

             return newPost;
        };

    public async getFeed(id: string) {

        const postDatabase = new PostDatabase();
        // const getFeed: Post = {
        //     user_id
        // };
        return await postDatabase.getFeed(id);
        };
    
    public async getPostType(type: string) {
        const postDatabase = new PostDatabase();

        const postType = await postDatabase.getFeedByType(toUserType(type));

        return postType;
    };
    
}