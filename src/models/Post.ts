export default interface Post {
    id: string;
    photo: string;
    description: string;
    created_at: Date;
    type: string;
    user_id: string;
  }
  
  export interface CreatePostDTO {
    photo: string;
    description: string;
    type: string;
    user_id: string;
  }

  export interface GetFeedDTO {
    user_id: string;
  }
