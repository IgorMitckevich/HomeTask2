import express,{Express} from "express";
import {postsRouter} from "./core/routers/postsRouters";
import {blogsRouter} from "./core/routers/blogsRouter";
import {testsRouter} from "./core/routers/testsRouter";

export const setupApp = (app:Express)=>{
    app.use(express.json());

    app.use("/blog",blogsRouter);
    app.use("/posts", postsRouter);
    app.use("/testing/all-data", testsRouter);
    return app;
}