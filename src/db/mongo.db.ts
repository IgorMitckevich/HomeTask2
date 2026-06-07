import { Collection, Db, MongoClient } from "mongodb";
import { BlogViewModel } from "../blogs/types/blogersModel";
import { PostViewModel } from "../posts/types/postsModel";
import { SETTINGS } from "../core/settings/settings";
import { CommentsDB } from "../comment/types/typeCommentsDB";
import { UsersCollectionDB } from "../users/types/users-collection-d-b";
import { ExpiresToken } from "../login/type/expired-token-type";
import {RateLimit} from "../rateLimit/types/rate-limit-type";
import {DeviceDbModel} from "../security/types/device-DB-model";
import mongoose from "mongoose";
import {DeviceViewModel} from "../security/types/device-view-model";


const BLOGS_COLLECTION_NAME = "blogs";
const POSTS_COLLECTION_NAME = "posts";
const USERS_COLLECTION_NAME = "users";
const COMMENTS_COLLECTION_NAME = "comments";
const EXPIRED_TOKENS_COLLECTION_NAME = "expired";
const DEVICES_COLLECTION_NAME = "devices";
const RATE_LIMIT_COLLECTION_NAME = "rateLimit";

// export let client: MongoClient;
// export let blogsCollection: Collection<BlogViewModel>;
// export let postsCollection: Collection<PostViewModel>;
// export let usersCollection: Collection<UsersCollectionDB>;
// export let commentsCollection: Collection<CommentsDB>;
// export let expiredTokensCollection: Collection<ExpiresToken>;
// export let devicesCollection:Collection<DeviceDbModel>;
// export let rateLimitCollection:Collection<RateLimit>;


const BlogSchema=new mongoose.Schema<BlogViewModel>({
  id: {type:String},
  name: {type:String},
  description: {type:String},
  websiteUrl: {type:String},
  createdAt: {type:String},
  isMembership: {type:Boolean}
});
export const BlogModel=mongoose.model(BLOGS_COLLECTION_NAME,BlogSchema);

const PostsSchema=new mongoose.Schema<PostViewModel>({
  id: {type:String},
  title: {type:String},
  shortDescription: {type:String},
  content: {type:String},
  blogId: {type:String},
  blogName: {type:String},
  createdAt: {type:String},
})

export const PostModel=mongoose.model(POSTS_COLLECTION_NAME,PostsSchema);

const UserSchema=new mongoose.Schema<UsersCollectionDB>({
  id: {type:String},
  login: {type:String},
  email: {type:String},
  createdAt: {type:String},
  password: {type:String},
  emailConfirmation: {
    confirmationCode: {type:String, nullable:true},
    expirationDate: {type:Date, nullable:true},
    isConfirmed: {type:Boolean}
  },
  recovery:{
    recoveryCode: {type:String,nullable:true},
    expirationDate: {type:Date,nullable:true},
  }
})

export const UserModel=mongoose.model(USERS_COLLECTION_NAME,UserSchema);

const CommentSchema=new mongoose.Schema<CommentsDB>({
  id: {type:String},
  content: {type:String},
  commentatorInfo: {
    userId: {type:String},
    userLogin: {type:String},
  },
  createdAt: {type:String},
  postId: {type:String},
})

export const CommentModel=mongoose.model(COMMENTS_COLLECTION_NAME,CommentSchema);

const ExpiredCollectionSchema=new mongoose.Schema<ExpiresToken>({
  refreshToken: {type:String},
  deviceId: {type:String},
  iat:{type:String},
  exp:{type:String}
})
export const ExpiredCollectionModel=mongoose.model(EXPIRED_TOKENS_COLLECTION_NAME,ExpiredCollectionSchema);

const DeviceSchema=new mongoose.Schema<DeviceDbModel>({
  userId:{type:String},
  ip: {type:String},
  title:{type:String},
  lastActiveDate:{type:String},
  deviceId:{type:String}
})

export const DeviceModel=mongoose.model(DEVICES_COLLECTION_NAME,DeviceSchema);

const RateLimitSchema=new mongoose.Schema<RateLimit>({
  IP:{type:String},
  URL:{type:String},
  date:{type:Date}
})
export const RateLimitModel=mongoose.model(RATE_LIMIT_COLLECTION_NAME,RateLimitSchema);

export async function runDb(url: string): Promise<void> {
  // client = new MongoClient(url);
  // const db: Db = client.db(SETTINGS.DB_NAME);
  // blogsCollection = db.collection<BlogViewModel>(BLOGS_COLLECTION_NAME);
  // postsCollection = db.collection<PostViewModel>(POSTS_COLLECTION_NAME);
  // usersCollection = db.collection<UsersCollectionDB>(USERS_COLLECTION_NAME);
  // commentsCollection = db.collection<CommentsDB>(COMMENTS_COLLECTION_NAME);
  // expiredTokensCollection = db.collection<ExpiresToken>(
  //   EXPIRED_TOKENS_COLLECTION_NAME,
  // );
  // devicesCollection=db.collection<DeviceDbModel>(DEVICES_COLLECTION_NAME);
  // rateLimitCollection=db.collection<RateLimit>(RATE_LIMIT_COLLECTION_NAME);



  try {

    await mongoose.connect(url+"/"+SETTINGS.DB_NAME)
    // await client.connect();
    // await db.command({ ping: 1 });
    console.log("Connected to the database");
  } catch (err) {
    await mongoose.disconnect();
    // await client.close();
    throw new Error(`Database not connected:${err}`);
  }
}
// export async function stopDb() {
//   if (!client) {
//     throw new Error(` No active client`);
//   }
//   await mongoose.disconnect()
//   // await client.close();
// }

