import { ICommentsModel, CommentsModel } from "./Comments"
import { IConnectionsModel, ConnectionsModel } from "./Connections"
import { ILikedModel, LikesModel } from "./Likes"
import { IPostsModel, PostsModel } from "./Posts"
import { IUserModel, UserModel } from "./User"

export { CommentsModel, ConnectionsModel, LikesModel, PostsModel, UserModel }

//the array is for usage in truncating.ts for testing
export const modelsArr = [
  CommentsModel,
  ConnectionsModel,
  LikesModel,
  PostsModel,
  UserModel,
]

export type {
  ICommentsModel,
  IConnectionsModel,
  ILikedModel,
  IPostsModel,
  IUserModel,
}
