// import request from "supertest";
// import express from "express";
// import { describe } from "node:test";
// import { runDb, stopDb } from "../../../src/db/mongo.db";
// import { setupApp } from "../../../src/setup-app";
//
// describe("Blogs API", () => {
//   const app = express();
//   setupApp(app);
//
//   beforeAll(async () => {
//     await runDb("mongodb://localhost:27017/hometask_3");
//   });
//
//   afterAll(async () => {
//     await stopDb();
//   });
//   let createBlog = null;
//   it("should create blog; POST:/blogs", async () => {
//     createBlog = await request(app).post("/blogs").expect(201).expect(200, {
//       id: String(),
//       name: String(),
//       description: String(),
//       websiteUrl: String(),
//       createdAt: new Date(),
//       isMembership: false,
//     });
//     expect(createBlog.body).toEqual({
//       id: expect.any(String),
//       name: expect.any(String),
//       description: expect.any(String),
//       websiteUrl: expect.any(String),
//       createdAt: expect.any(Date.toString()),
//       isMembership: expect.any(false),
//     });
//   });
// });
