import {
  CommentsModel,
  ConnectionsModel,
  LikesModel,
  PostsModel,
  UsersModel,
} from "./"

export const setAssociations = () => {
  UsersModel.hasMany(PostsModel, { foreignKey: "ownerId" })
  UsersModel.hasMany(LikesModel, { foreignKey: "userId" })
  UsersModel.hasMany(CommentsModel, { foreignKey: "userId" })

  //demo: still to test if this works
  UsersModel.belongsToMany(UsersModel, {
    through: ConnectionsModel,
    as: "followerId",
    foreignKey: "followerId",
  })
  UsersModel.belongsToMany(UsersModel, {
    through: ConnectionsModel,
    as: "followingId",
    foreignKey: "followingId",
  })

  PostsModel.belongsTo(UsersModel, { foreignKey: "ownerId" })
  PostsModel.hasMany(LikesModel, { foreignKey: "postId" })
  PostsModel.hasMany(CommentsModel, { foreignKey: "postId" })

  LikesModel.belongsTo(UsersModel, { foreignKey: "userId" })
  LikesModel.belongsTo(PostsModel, { foreignKey: "postId" })

  CommentsModel.belongsTo(PostsModel, { foreignKey: "postId" })
  CommentsModel.belongsTo(UsersModel, { foreignKey: "userId" })
}
