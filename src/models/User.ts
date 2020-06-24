export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface DeleteFriendshipDTO {
  user_id: string;
  friend_id: string;
}

export interface MakeFriendshipDTO {
  friend_id: string;
  user_id: string;
}

export interface loginDTO {
  email: string;
  password: string;
}

export interface signUpDTO {
  name: string;
  email: string;
  password: string;
}
