import express, { Express } from "express";
import { postsRouter } from "./posts/routers/postsRouters";
import { blogsRouter } from "./blogs/routers/blogsRouter";
import { testsRouter } from "./core/routers/testsRouter";
import {
  Blogs_Path,
  Login_Path,
  Posts_Path,
  Tests_Path,
  Users_Path
} from "./core/paths/paths";
import {usersRouter} from './users/routes/users-router'
import {loginRouter} from "./login/routers/login-router";


export const setupApp = async (app: Express) => {
  app.use(express.json());

  app.get("/", async (req, res) => {
    res.send("not main page");
  });

  app.use(Blogs_Path, blogsRouter);
  app.use(Posts_Path, postsRouter);
  app.use(Tests_Path, testsRouter);
  app.use(Users_Path, usersRouter);
  app.use(Login_Path, loginRouter);
  return app;
};
