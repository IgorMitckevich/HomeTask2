import express, { Express } from "express";
import { postsRouter } from "./posts/routers/postsRouters";
import { blogsRouter } from "./blogs/routers/blogsRouter";
import { testsRouter } from "./core/routers/testsRouter";
import { Blogs_Path, Posts_Path, Tests_Path } from "./core/paths/paths";

export const setupApp = async (app: Express) => {
  app.use(express.json());

  app.get("/", async (req, res) => {
    res.send("not main page");
  });


  app.use(Blogs_Path, blogsRouter);
  app.use(Posts_Path, postsRouter);
  app.use(Tests_Path, testsRouter);
  return app;
};
