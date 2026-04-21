import express from "express";
import {setupApp} from "../../../src/setup-app";
import {commentsCollection, runDb, stopDb} from "../../../src/db/mongo.db";
import {usersCollection} from "../../../src/db/mongo.db";
import request from "supertest";
import {Comments_Path, Login_Path} from "../../../src/core/paths/paths";
import {UserViewModelWithPassword} from "../../../src/users/types/UserViewModelWithPassword";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {queryUsersRepositories} from "../../../src/users/repositories/query-user-repositories";
import {CommentViewModel} from "../../../src/comment/types/CommentViewModel";



jest.setTimeout(30000);

describe("User API Tests",  () => {

    const  app=express()

    setupApp(app)




    beforeAll(async ()=>{
        await runDb('mongodb://localhost:27017/hometask_3');

        const commentForTest:CommentViewModel={
            id:'1',
            content:'hello kitty',
            commentatorInfo:{
                userId:'Igor',
                userLogin:'karabum'
            },
            createdAt:'2026-04-20T12:00:00Z'
        }

        await commentsCollection.insertOne(commentForTest);



    });

    afterAll(async ()=>{
        await usersCollection.deleteMany({});
        await stopDb();
    })

    it('shold be create a comment',async ()=>{

        const response=await request(app).put(Comments_Path+'/comments')
            .send({content:'hello my friend'})

        expect(response.status).toBe(204);
    })



})



