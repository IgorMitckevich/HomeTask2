import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./core/settings/settings";
import { expiredTokensCollection, runDb } from "./db/mongo.db";
import { setInterval } from "node:timers";
// import dotenv from "dotenv";
//
// dotenv.config();
const MONGO_URI = "mongodb://0.0.0.0:27017";
// const MONGO_URI = process.env.MONGO_URl ||'mongodb://0.0.0.0:27017';
console.log(MONGO_URI);
// console.log(process.env.MONGO_URL)

const server = async () => {
  const app = express();

  await setupApp(app);

  const PORT = SETTINGS.PORT;
  await runDb(SETTINGS.MONGO_URL);
  // setInterval(async () => {
  //   await expiredTokensCollection.deleteMany({})
  // },60*60*1000)
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });

  return app;
};
server();
