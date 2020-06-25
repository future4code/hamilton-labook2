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

  export interface GetFeedByTypeDTO {
    type: string;
  }

  export interface AddLikeTDO{
    post_id: string;
    user_id: string;
  }

  export interface RemoveLikeTDO {
    post_id: string;
    user_id: string;
  }

  export enum PostType {
    NORMAL = "normal",
    EVENT = "event"
  }

  export const toUserType = (value: string): PostType => {
    switch (value) {
      case "normal": 
      return PostType.NORMAL;        
      case "event": 
      return PostType.EVENT;        
      default: 
      return PostType.NORMAL;
    }
  }
