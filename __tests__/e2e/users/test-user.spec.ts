import express from "express";
import {setupApp} from "../../../src/setup-app";
import {runDb, stopDb} from "../../../src/db/mongo.db";
import {usersCollection} from "../../../src/db/mongo.db";
import request from "supertest";
import {Login_Path} from "../../../src/core/paths/paths";
import {UserViewModelWithPassword} from "../../../src/users/types/UserViewModelWithPassword";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {queryUsersRepositories} from "../../../src/users/repositories/query-user-repositories";



jest.setTimeout(30000);

describe("User API Tests",  () => {

    const  app=express()

      setupApp(app)


    const validLogin = 'testUser';
    const validEmail = 'test@example.com';
    const validPassword = 'Qwerty123!';
    const hashedPassword = bcrypt.hashSync(validPassword, 10);




    beforeAll(async ()=>{
        await runDb('mongodb://localhost:27017/hometask_3');

        const User_DB_First:UserViewModelWithPassword={
            id:new ObjectId().toString(),
            login:validLogin,
            email:validEmail,
            password:hashedPassword,
            createdAt:new Date().toISOString()
        }
        await usersCollection.insertOne(User_DB_First);


        // await usersRepository.create({
        //     login: validLogin,
        //     email: validEmail,
        //     password: validPassword
        // });
    });

    afterAll(async ()=>{
        await usersCollection.deleteMany({login:validLogin});
        await stopDb();
    })



    it('should return 200 No Content when login with valid email and password', async () => {
        const response = await request(app)
            .post(Login_Path.auth.login)
            .send({
                loginOrEmail: validEmail,
                password: validPassword
            });

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body.token).toBe('string');
        expect(response.body).not.toBe('');

    });

    it('should return 401 Unauthorized when password is incorrect', async () => {
        const response = await request(app)
            .post(Login_Path.auth.login)
            .send({
                loginOrEmail: validLogin,
                password: 'wrongPassword',
            });

        expect(response.status).toBe(401);

    });

    it('should return 500 Internal Server Error if database throws error (mock)', async () => {
        // Мокаем репозиторий, чтобы выбросить исключение
        jest.spyOn(queryUsersRepositories, 'getUserByLoginOrEmail').mockRejectedValueOnce(new Error('DB error'));

        const response = await request(app)
            .post(Login_Path.auth.login)
            .send({
                loginOrEmail: validLogin,
                password: validPassword,
            });

        expect(response.status).toBe(500);
        expect(response.text).toContain('DB error');
    });
})



