import { ICommentsModel, CommentsModel } from "./Comments"
import { IConnectionsModel, ConnectionsModel } from "./Connections"
import { ILikedModel, LikesModel } from "./Likes"
import { IPostsModel, PostsModel } from "./Posts"
import { IUsersModel, UsersModel } from "./User"

import { setAssociations } from "./associations"

export { CommentsModel, ConnectionsModel, LikesModel, PostsModel, UsersModel }

//the array is for usage in truncating.ts for testing
export const modelsArr = [
  CommentsModel,
  ConnectionsModel,
  LikesModel,
  PostsModel,
  UsersModel,
]

export { setAssociations }

export type {
  ICommentsModel,
  IConnectionsModel,
  ILikedModel,
  IPostsModel,
  IUsersModel,
}
