// import express from "express";
// import { setupApp } from "../../../src/setup-app";
// import { commentsCollection, runDb, stopDb } from "../../../src/db/mongo.db";
// import request from "supertest";
// import { postsRouter } from "../../../src/posts/routers/postsRouters";
// import { accessTokenGuard } from "../../../src/auth/middlewares/authorization";
//
// describe("comments by PostId API Tests", () => {
//   const app = express();
//
//   setupApp(app);
//
//   beforeAll(async () => {
//     await runDb("mongodb://localhost:27017/hometask_3");
//
//     // await commentsCollection.insertOne();
//   });
//
//   afterAll(async () => {
//     await commentsCollection.deleteMany();
//     await stopDb();
//   });
//
//   it("should create a new comment", async () => {
//     const response = await request(app)
//       .post(postsRouter + "/:postId/comments")
//       .set("Authorization", `Bearer ${accessTokenGuard}`)
//       .send("new Comment");
//
//     expect(response.status).toBe(200);
//     expect(response.body).toBe({
//       id: expect.any(String),
//       content: expect.any(String),
//       commentatorInfo: {
//         userId: expect.any(String),
//         userLogin: expect.any(String),
//       },
//       createdAt: expect.any(Date.toString()),
//     });
//     expect(response.body).not.toBe("");
//   });
//
//   it("should get a list of comments", async () => {
//     const response = await request(app).get(postsRouter + "/:postId/comments");
//
//     expect(response.body).toBe({
//       items: {
//         id: expect.any(String),
//         content: expect.any(String),
//         commentatorInfo: {
//           userId: expect.any(String),
//           userLogin: expect.any(String),
//         },
//         createdAt: expect.any(Date.toString()),
//       },
//       pageNumber: 1,
//       pageSize: 10,
//     });
//   });
// });
