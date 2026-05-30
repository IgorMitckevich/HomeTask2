import express, {Express,Request,Response, NextFunction} from "express";
import { postsRouter } from "./posts/routers/postsRouters";
import { blogsRouter } from "./blogs/routers/blogsRouter";
import { testsRouter } from "./core/routers/testsRouter";
import {
  Blogs_Path,
  Comments_Path,
  Login_Path,
  Posts_Path, Security_Path,
  Tests_Path,
  Users_Path,
} from "./core/paths/paths";
import { usersRouter } from "./users/routes/users-router";
import { loginRouter } from "./login/routers/login-router";
import { comments_router } from "./comment/routers/comments-router";
import {security_router} from "./security/router/security-device-router";
import {rateLimitCollection} from "./db/mongo.db";
import {HttpStatus} from "./core/https-statuses/httpStatuses";

export const setupApp = async (app: Express) => {
  app.use(express.json());

  app.get("/", async (req, res) => {
    res.send("not main page");
  });
  app.use(Blogs_Path, blogsRouter);
  app.use(Posts_Path, postsRouter);
  app.use(Tests_Path, testsRouter);
  app.use(Users_Path, usersRouter);
  app.use(Login_Path.common, loginRouter);
  app.use(Comments_Path, comments_router);
  app.use(Security_Path.security,security_router)
  return app;
};

export async function callCounting(req:Request, res:Response, next:NextFunction)  {

  try {
    // const ip = req.headers['x-forwarded-for'] as string || req.ip as string;
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (Array.isArray(forwarded)
            ? forwarded[0]
            : forwarded?.split(',')[0]?.trim())
        ?? req.ip
        ?? 'unknown';
    const url = req.originalUrl;

    await rateLimitCollection.insertOne({IP:ip,URL:url,date:new Date()})

  const tenSecondsAgo=new Date(Date.now()-10*1000);
  const requestCount=await rateLimitCollection.countDocuments({
    IP:ip,
    URL:url,
    date:{$gte:tenSecondsAgo}
  });

    if (requestCount>5){
    return res.sendStatus(429);
  }
  next()
  }catch(err){
    console.log(`catch error in callCounting:${err}`);
    res.sendStatus(HttpStatus.InternalServerError)
  }
}

