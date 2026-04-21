import express from "express";
import { setupApp } from "./setup-app";
import {SETTINGS} from "./core/settings/settings";
import {runDb} from "./db/mongo.db";
// import dotenv from "dotenv";
//
// dotenv.config();
const MONGO_URI='mongodb://0.0.0.0:27017';
// const MONGO_URI = process.env.MONGO_URl ||'mongodb://0.0.0.0:27017';
console.log(MONGO_URI);
// console.log(process.env.MONGO_URL)

 const server= async ()=>{
    const app=express();

     setupApp(app);

    const PORT = SETTINGS.PORT;
    await runDb(SETTINGS.MONGO_URL);

    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });

    return app;

  }
  server();