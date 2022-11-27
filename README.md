This repository is a backend implementation for what was used on the socialyte mobile repo.

From firebase BAAS to a custom backend implementation, from non-relational cloud firestore to relational db mysql and sequelize ORM.

Wanted to implement tests, but I'm afraid the only ones that they're gonna be be are these.

Things this API supports are:

- User authentication
- User registration
- User profile
- User profile update
- User profile delete
- User profile image upload
- Post creation
- Post update
- Post delete
- Post like
- Post unlike
- Post comment
- Post comment delete
- Post comment like
- Post comment unlike
- Post comment reply
- Post comment reply delete
- Post comment reply like
- Post comment reply unlike
- Follow user
- Unfollow user
- Get user followers
- Get user following
- Get user posts
- Get user liked posts
- Get user comments
- Get user liked comments
- Get user replies
- Get user liked replies
- Maybe some more features to come

Trying to run locally?

- Clone the repo
- Run npm install
- Create an .env file with a local mysql database and its credentials ( can get guided by the src/dbPool.js file )
- Run npm start
- Use Postman to test the endpoints
