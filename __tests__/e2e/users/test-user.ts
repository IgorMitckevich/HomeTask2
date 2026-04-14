import {describe} from "node:test";
import express from "express";
import {setupApp} from "../../../src/setup-app";
import {runDb, stopDb} from "../../../src/db/mongo.db";
import bcrypt from "bcrypt";
import {usersCollection} from "../../../src/db/mongo.db";
import request from "supertest";
import * as string_decoder from "node:string_decoder";
import {UserInputModel} from "../../../src/users/types/UserInputModel";
import {usersRepository} from "../../../src/users/repositories/users-repository";

describe("User API Tests", () => {
    const app=express()
    setupApp(app)

    let hashedPassword: string;
    const validLogin = 'testuser';
    const validEmail = 'test@example.com';
    const validPassword = 'Qwerty123!';

    const testUser1:UserInputModel={
        login:'testuser',
        email:'test@example.com',
        password:'Qwerty123!'
    }
    beforeAll(async ()=>{
        await runDb('mongodb://localhost:27017/hometask_3');
        hashedPassword = await bcrypt.hash(validPassword, 10);
        await usersRepository.create({
            login: validLogin,
            email: validEmail,
            password: hashedPassword
        });
    });

    afterAll(async ()=>{
        await usersCollection.deleteMany({login:validLogin});
        await stopDb();
    })
        let createUser=null

    it('should return 204 No Content when login with valid email and password', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                loginOrEmail: validEmail,
                password: validPassword,
            });

        expect(response.status).toBe(204);
    });

    it('should return 401 Unauthorized when password is incorrect', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                loginOrEmail: validLogin,
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
    });

    it('should return 500 Internal Server Error if database throws error (mock)', async () => {
        // Мокаем репозиторий, чтобы выбросить исключение
        jest.spyOn(usersRepository, 'findUserByLoginOrEmail').mockRejectedValueOnce(new Error('DB error'));

        const response = await request(app)
            .post('/login')
            .send({
                loginOrEmail: validLogin,
                password: validPassword,
            });

        expect(response.status).toBe(500);
        expect(response.text).toContain('DB error');
    });
});



    // it(`shouldn't create a user, with incorrect valuest`, async () => {
    //
    //     createUser = await request(app)
    //         .post("/users")
    //         .send({})
    //         .expect(400,{errorsMessages:[{message:`${expect.any(String)}`,field:`${expect.any(String)}`}]})
    // })
    //
    // it('Should return Unauthorized, when try create new user', async () => {
    //
    //     await request(app)
    //         .post("/users")
    //     .send({})
    //     .expect(401)
    // })
    //
    //
    // it('should create users', async () => {
    //      createUser=await request(app)
    //         .post('/users')
    //         .send({})
    //         .expect(201,{ id:expect.any(String),
    //             login:expect.any(String),
    //             email:expect.any(String),
    //             createdAt:expect.any(String)})
    //
    //      expect(createUser.body).toEqual({
    //          id:expect.any(String),
    //          login:expect.any(String),
    //          email:expect.any(String),
    //          createdAt:expect.any(String)
    //      })
    //
    //     await request(app)
    //     .get('/users/')
    //         .expect(200)
    // })
    //
    // it('Should return Unauthorized, when try get all users', async () => {
    //     await request(app)
    //         .get('/users')
    //     .expect(401)
    // })
    //
    // it('Should return all users', async () => {
    //
    //     await request(app)
    //         .get('/users/')
    //         .expect(
    //             201,
    //             {
    //                 pagesCount:0,
    //                 page:0,
    //                 pageSize:0,
    //                 totalCount:0,
    //                 items:[
    //                     {
    //                         id:expect.any(String),
    //                         login:expect.any(String),
    //                         email:expect.any(String),
    //                         createdAt:expect.any(Date.toString())
    //                     }
    //                 ]
    //             })
    // })
    //
    //
    // it('Should return Unauthorized, when try delete user', async () => {
    //     await request(app)
    //         .delete(`/users/`${req.params.id}``)
    //         .send(id)
    //         .expect(401)
    // })
    //
    // it('Should return not found, if user is not exists', async () => {
    //     await request(app)
    //         .delete(`/users/`${req.params.id}``)
    // .send(id)
    //         .expect(404)
    // })
    //
    // it('Shoult return 204, when user was delete', async () => {
    //     await request(app)
    //         .delete(`/users/`${req.params.id}``)
    // .send(id)
    //         .expect(204)
    // })
    //
    // it('Should return 400, if user input incorrect values', async () => {
    //     await request(app)
    //         .post('auth/login')
    //         .send({loginOrEmail:123, password:'123'})
    //         .expect(400)
    // })
    //
    // it('Should return 401, if user write wrong password or login', async () => {
    //     await request(app)
    //         .post('auth/login')
    //         .send({loginOrEmail:123, password:'123'})
    //         .expect(401)
    // })
    //
    // it('Should return 204, if user write correct login and password', async () => {
    //     await request(app)
    //         .post('auth/login')
    //         .send({loginOrEmail:123, password:'123'})
    //         .expect(204)
    // })

})