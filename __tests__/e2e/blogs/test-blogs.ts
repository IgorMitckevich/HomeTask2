import request from 'supertest'
import express from 'express'
import {describe} from "node:test";
import {setupApp} from "../../../src/setup-app";
import {runDb, stopDb} from "../../../src/db/mongo.db";
import {createBlog} from "../../../src/blogs/routers/handlers/createBlogs";
import {setupApp} from "../../../src/setup-app";
import {blogsRouter} from "../../../src/blogs/routers/blogsRouter";
import {ObjectId} from "mongodb";



// describe('Blogs API',()=>{
//     const app=express()
//     setupApp(app)
//
//
//     const adminToken=generateBasicAuthToker();
//
//     beforeAll(async ()=>{
//         await runDb('mongodb://localhost:27017/hometask_3');
//
//     });
//
//     afterAll(async ()=>{
//         await stopDb();
//     })
//
//     it('should create blog; POST:/blogs', async () => {
//
//         await request(app)
//             .post('/blogs')
//             .expect(201)
//             .expect({
//                 id:String(),
//                 name: String(),
//                 description: String(),
//                 websiteUrl: String(),
//                 createdAt: new Date(),
//                 isMembership: false,
//             })
//             .end(done);
//
//     })
// })