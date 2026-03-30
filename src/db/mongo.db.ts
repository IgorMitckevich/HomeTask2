import { Collection, Db, MongoClient } from 'mongodb';
import {blogs} from './dbBlogs'
import {posts} from "./dbPosts";
import {BlogViewModel} from "../core/types/blogersModel";
import {PostViewModel} from "../core/types/postsModel";
import {SETTINGS} from "../core/settings/settings";


const BLOGS_COLLECTION_NAME = "blogs";
const POSTS_COLLECTION_NAME = "posts";

export let client:MongoClient;
export let blogsCollection:Collection<BlogViewModel>;
export let postsCollection:Collection<PostViewModel>;

export async function runDb(url:string):Promise<void> {
    client=new MongoClient(url);
    const db:Db=client.db(SETTINGS.DB_NAME);

    blogsCollection= db.collection<BlogViewModel>(BLOGS_COLLECTION_NAME);
    postsCollection= db.collection<PostViewModel>(POSTS_COLLECTION_NAME);

    try{
        await client.connect();
        await db.command({ping:1});
        console.log("Connected to the database")
    }catch(err){
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