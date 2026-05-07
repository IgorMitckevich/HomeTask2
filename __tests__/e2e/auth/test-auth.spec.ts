import express from "express";
import { setupApp } from "../../../src/setup-app";
import { runDb, stopDb } from "../../../src/db/mongo.db";
import { usersCollection } from "../../../src/db/mongo.db";
import request from "supertest";
import { Login_Path } from "../../../src/core/paths/paths";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { queryUsersRepositories } from "../../../src/users/repositories/query-user-repositories";
import {usersCollectionDB} from "../../../src/users/types/users-collection-DB";
import {nodemailerApplication} from "../../../src/login/nodemaierService/sendEmail";
import {beforeEach} from "node:test";

jest.setTimeout(30000);

describe("User API Tests", () => {
  const app = express();

   setupApp(app);

  const correctLogin = "testUser";
  const corectEmail = "test@example.com";
  const correctPassword = "Qwerty123!";
  const hashedPassword = bcrypt.hashSync(correctPassword, 10);

  beforeAll(async () => {
    await runDb("mongodb://localhost:27017/hometask_3");

    const User_DB_First: usersCollectionDB = {
      id: new ObjectId().toString(),
      login: correctLogin,
      email: corectEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      emailConfirmation:{
        confirmationCode:"rightCode",
        isConfirmed:false,
        expirationDate:new Date(),
      }
    };
    await usersCollection.insertOne(User_DB_First);
  });

  afterAll(async () => {
    await usersCollection.deleteMany({ login: correctLogin });
    await stopDb();
  });

  it("should return 200 No Content when login with valid email and password", async () => {
    const response = await request(app).post(Login_Path.auth.login).send({
      loginOrEmail: corectEmail,
      password: correctPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body.accessToken).toBe("string");
    expect(response.body).not.toBe("");
  });

  it("should return 401 Unauthorized when password is incorrect", async () => {
    const response = await request(app).post(Login_Path.auth.login).send({
      loginOrEmail: correctLogin,
      password: "wrongPassword",
    });

    expect(response.status).toBe(401);
  });

  it("should return 500 Internal Server Error if database throws error (mock)", async () => {
    // Мокаем репозиторий, чтобы выбросить исключение
    jest
      .spyOn(queryUsersRepositories, "getUserByLoginOrEmail")
      .mockRejectedValueOnce(new Error("DB error"));

    const response = await request(app).post(Login_Path.auth.login).send({
      loginOrEmail: correctLogin,
      password: correctPassword,
    });

    expect(response.status).toBe(500);
    expect(response.text).toContain("DB error");
  });

  describe('create registration tests', () => {

    const incorrectLogin: string = 'soMuchLettersInLogin';
    const incorrectEmail: string = 'soMuchLettersInEmailActuallyMoreThanNeed';
    const incorrectPassword: string = '123';

    const originalEmailAdapter = nodemailerApplication;
    const emailAdapterMock: jest.Mocked<nodemailerApplication> = {
      sendEmail: jest.fn(),
      confirmEmail: jest.fn(),
    };

    beforeEach(() => {
      // Подменяем
      Object.assign(nodemailerApplication, emailAdapterMock);
    });

    afterEach(() => {
      // Возвращаем обратно
      Object.assign(nodemailerApplication, originalEmailAdapter);
      jest.clearAllMocks();
    });



    it('should not create because incorrect login', async () => {

      const response = await request(app).
      post(Login_Path.auth.registration).
      send({
        login: incorrectLogin,
        password: correctPassword,
        email: corectEmail
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorsMessages: expect.arrayContaining([
          expect.objectContaining({field: 'login', message: expect.any(String)})
        ])
      })
    })

    it('should not create because incorrect email', async () => {

      const response = await request(app).
      post(Login_Path.auth.registration).
      send({
        login: incorrectLogin,
        password: correctPassword,
        email:incorrectEmail
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorsMessages: expect.arrayContaining([
          expect.objectContaining({field: 'email', message: expect.any(String)})
        ])
      })
    })

    it('should not create because incorrect password', async () => {

      const response = await request(app).
      post(Login_Path.auth.registration).
      send({
        login: correctLogin,
        password: incorrectPassword,
        email:corectEmail
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errorsMessages: expect.arrayContaining([
          expect.objectContaining({field: 'password', message: expect.any(String)})
        ])
      })
    })

    it('should create not user login', async () => {
      await usersCollection.deleteOne({ login: correctLogin });
      emailAdapterMock.confirmEmail.mockResolvedValue(true)
      const response=await request(app).
      post(Login_Path.auth.registration).
      send({
        login: correctLogin,
        password:correctPassword,
        email:corectEmail
      });

      expect(response.status).toBe(204);
      })
    })

  it('should send error not unique login', async () => {

    const response=await request(app).
    post(Login_Path.auth.registration).
    send({
      login: correctLogin,
      password:correctPassword,
      email:'igor@igor.com'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errorsMessages: expect.arrayContaining([
        expect.objectContaining({field: 'login', message: expect.any(String)})
      ])
    })

  })

  it('should send error not unique email', async () => {

    const response=await request(app).
    post(Login_Path.auth.registration).
    send({
      login: 'igor',
      password:correctPassword,
      email:corectEmail
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errorsMessages: expect.arrayContaining([
        expect.objectContaining({field: 'email', message: expect.any(String)})
      ])
    })

  })


});
