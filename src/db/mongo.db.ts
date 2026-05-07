import { Collection, Db, MongoClient } from "mongodb";
import { BlogViewModel } from "../blogs/types/blogersModel";
import { PostViewModel } from "../posts/types/postsModel";
import { SETTINGS } from "../core/settings/settings";
import { UserViewModelWithPassword } from "../users/types/UserViewModelWithPassword";
import { CommentsDB } from "../comment/types/typeCommentsDB";
import {usersCollectionDB} from "../users/types/users-collection-DB";

const BLOGS_COLLECTION_NAME = "blogs";
const POSTS_COLLECTION_NAME = "posts";
const USERS_COLLECTION_NAME = "users";
const COMMENTS_COLLECTION_NAME = "comments";

export let client: MongoClient;
export let blogsCollection: Collection<BlogViewModel>;
export let postsCollection: Collection<PostViewModel>;
export let usersCollection: Collection<usersCollectionDB>;
export let commentsCollection: Collection<CommentsDB>;

export async function runDb(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  blogsCollection = db.collection<BlogViewModel>(BLOGS_COLLECTION_NAME);
  postsCollection = db.collection<PostViewModel>(POSTS_COLLECTION_NAME);
  usersCollection = db.collection<usersCollectionDB>(
    USERS_COLLECTION_NAME,
  );
  commentsCollection = db.collection<CommentsDB>(COMMENTS_COLLECTION_NAME);
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
