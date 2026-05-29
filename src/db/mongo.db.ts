import { Collection, Db, MongoClient } from "mongodb";
import { BlogViewModel } from "../blogs/types/blogersModel";
import { PostViewModel } from "../posts/types/postsModel";
import { SETTINGS } from "../core/settings/settings";
import { UserViewModelWithPassword } from "../users/types/UserViewModelWithPassword";
import { CommentsDB } from "../comment/types/typeCommentsDB";
import { usersCollectionDB } from "../users/types/users-collection-DB";
import { ExpiresToken } from "../login/type/expired-token-type";
import {UserViewModel} from "../users/types/UserViewModel";
import {DeviceViewModel} from "../security/types/device-view-model";
import {RateLimit} from "../rateLimit/types/rate-limit-type";
import {DeviceDbModel} from "../security/types/device-DB-model";

const BLOGS_COLLECTION_NAME = "blogs";
const POSTS_COLLECTION_NAME = "posts";
const USERS_COLLECTION_NAME = "users";
const COMMENTS_COLLECTION_NAME = "comments";
const EXPIRED_TOKENS_COLLECTION_NAME = "expired";
const DEVICES_COLLECTION_NAME = "devices";
const RATE_LIMIT_COLLECTION_NAME = "rateLimit";

export let client: MongoClient;
export let blogsCollection: Collection<BlogViewModel>;
export let postsCollection: Collection<PostViewModel>;
export let usersCollection: Collection<usersCollectionDB>;
export let commentsCollection: Collection<CommentsDB>;
export let expiredTokensCollection: Collection<ExpiresToken>;
export let devicesCollection:Collection<DeviceDbModel>;
export let rateLimitCollection:Collection<RateLimit>;

export async function runDb(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  blogsCollection = db.collection<BlogViewModel>(BLOGS_COLLECTION_NAME);
  postsCollection = db.collection<PostViewModel>(POSTS_COLLECTION_NAME);
  usersCollection = db.collection<usersCollectionDB>(USERS_COLLECTION_NAME);
  commentsCollection = db.collection<CommentsDB>(COMMENTS_COLLECTION_NAME);
  expiredTokensCollection = db.collection<ExpiresToken>(
    EXPIRED_TOKENS_COLLECTION_NAME,
  );
  devicesCollection=db.collection<DeviceDbModel>(DEVICES_COLLECTION_NAME);
  rateLimitCollection=db.collection<RateLimit>(RATE_LIMIT_COLLECTION_NAME);
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Connected to the database");
  } catch (err) {
    await client.close();
    throw new Error(`Database not connected:${err}`);
  }
}
export async function stopDb() {
  if (!client) {
    throw new Error(` No active client`);
  }
  await client.close();
}
