import express from "express";
import { setupApp } from "../../../src/setup-app";
import {
  blogsCollection,
  commentsCollection,
  postsCollection,
  runDb,
  stopDb,
} from "../../../src/db/mongo.db";
import { usersCollection } from "../../../src/db/mongo.db";
import request from "supertest";
import {Comments_Path, Login_Path, Posts_Path} from "../../../src/core/paths/paths";
// @ts-ignore
import {users, usersWithHashPassword} from "../users/UsersDB/users-DB-test";
// @ts-ignore
import { comments } from "./commentsDB";
// @ts-ignore
import { posts } from "../posts/postsDB";
// @ts-ignore
import { blogs } from "../blogs/blogsDB";
import bcrypt from "bcrypt";

jest.setTimeout(30000);

describe("Comments API Tests", () => {
  const app = express();

   setupApp(app);

  beforeAll(async () => {
    await runDb("mongodb://localhost:27017/hometask_3");

    await blogsCollection.insertMany(blogs);
    await postsCollection.insertMany(posts);
    await usersCollection.insertMany(usersWithHashPassword);
    await commentsCollection.insertMany(comments);

  });

  afterAll(async () => {
    await blogsCollection.deleteMany({});
    await postsCollection.deleteMany({});
    await usersCollection.deleteMany({});
    await commentsCollection.deleteMany({});
    await stopDb();
  });

  let accessToken:string;
  it("should return 401 Unauthorized when password is incorrect", async () => {
    const response = await request(app).post(Login_Path.auth.login).send({
      loginOrEmail: users[0].login,
      password: "wrongPassword",
    });

    expect(response.status).toBe(401);
  });

  it("should return 200 No Content when login with valid email and password", async () => {
    const response = await request(app).post(Login_Path.auth.login).send({
      loginOrEmail: users[0].login,
      password: users[0].password,
    });
    accessToken=response.body.accessToken;


    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body.accessToken).toBe("string");
    expect(response.body).not.toBe("");
  });

  it('Post comment should return status 400', async () => {
    const response=await request(app)
        .post(Posts_Path+`/${posts[0].id}/comments`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({content:"small content"})

    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorsMessages:[{field:"content", message:"The length of the string must be between 20 and 300 symbols"}]});
  })

  it('Post comment should return status 404', async () => {
    const response=await request(app)
        .post(Posts_Path+"/123/comments")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ content: "test comment with more 20length" })

      expect(response.status).toBe(404);
  })

  // it('Post comment should return status 403', async () => {
  //   const response=await request(app)
  //       .post(Posts_Path+`/${posts[0].id}/comments`)
  //       .send({ content: "test comment with more 20length" })
  //
  //   expect(response.status).toBe(403);
  // })


  it("create comment should return status 200", async () => {

    const response = await request(app)
      .post(Posts_Path+ `/${posts[0].id}/comments`)
        .set("Authorization", `Bearer ${accessToken}`)
      .send({ content: "test comment with more 20length" });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual({
      id:expect.any(String),
      content: "test comment with more 20length",
      createdAt: expect.any(String),
      commentatorInfo:{
        userId:expect.any(String),
        userLogin:expect.any(String)
      }
    })
  });

  // it("should be create a comment", async () => {
  //   const response = await request(app)
  //     .put(Comments_Path + "/:commentId")
  //     .send({ content: "hello my friend" });
  //
  //   expect(response.status).toBe(204);
  // });
});
