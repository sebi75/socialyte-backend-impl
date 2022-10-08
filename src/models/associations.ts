import {
  CommentsModel,
  ConnectionsModel,
  LikesModel,
  PostsModel,
  UsersModel,
  UsersProfileModel,
} from "./"

export const setAssociations = async () => {
  UsersModel.hasMany(PostsModel, { foreignKey: "ownerId" })
  UsersModel.hasMany(LikesModel, { foreignKey: "userId" })
  UsersModel.hasMany(CommentsModel, { foreignKey: "userId" })
  UsersModel.hasOne(UsersProfileModel, {
    foreignKey: "userId",
    as: "userData",
  })

  /* Defining many-to-many in sequelize to the same table is a bit tricky, but it is done as down below */
  UsersModel.belongsToMany(UsersModel, {
    through: ConnectionsModel,
    as: "following",
    foreignKey: "followerId",
  })
  UsersModel.belongsToMany(UsersModel, {
    through: ConnectionsModel,
    as: "follower",
    foreignKey: "followingId",
  })

  ConnectionsModel.belongsTo(UsersModel, {
    foreignKey: "followerId",
    targetKey: "userId",
    as: "follower",
  })
  ConnectionsModel.belongsTo(UsersModel, {
    foreignKey: "followingId",
    targetKey: "userId",
    as: "following",
  })

  PostsModel.belongsTo(UsersModel, { foreignKey: "ownerId" })
  PostsModel.hasMany(LikesModel, { foreignKey: "postId" })
  PostsModel.hasMany(CommentsModel, { foreignKey: "postId" })

  LikesModel.belongsTo(UsersModel, { foreignKey: "userId" })
  LikesModel.belongsTo(PostsModel, { foreignKey: "postId" })

  CommentsModel.belongsTo(PostsModel, { foreignKey: "postId" })
  CommentsModel.belongsTo(UsersModel, { foreignKey: "userId" })

  UsersProfileModel.belongsTo(UsersModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "userData",
  })

  /* const getUserProfile = await UsersProfileModel.findOne({
    where: { userId: ["c9e5211b-deb1-4635-9394-1cde45ea595b"] },
    attributes: ["userId", "bio"],
    include: {
      model: UsersModel,
      attributes: ["email", "username", "createdAt"],
      as: "userData",
    },
  })
  console.log({ getUserProfile: getUserProfile?.toJSON() })

  const getUserWithProfile = await UsersModel.findOne({
    where: { userId: "c9e5211b-deb1-4635-9394-1cde45ea595b" },
    attributes: ["email", "username", "createdAt"],
    include: {
      model: UsersProfileModel,
      attributes: ["userId", "bio"],
      as: "userData",
    },
  })

  const followers = await ConnectionsModel.findAll({
    where: { followingId: "4f6e4266-d783-4bbb-b53d-786649dd7d0e" },
    include: [
      {
        model: UsersModel,
        as: "follower",
        attributes: ["email", "username", "createdAt"],
      },
    ],
  })
  console.log({ followers: followers })

  console.log({ getUserWithProfile: getUserWithProfile?.toJSON() }) */
}
