// import request from "supertest";
// import { beforeEach } from "node:test";
// import {
//   expiredTokensCollection,
//   usersCollection,
// } from "../../../src/db/mongo.db";
// import express from "express";
// import { setupApp } from "../../../src/setup-app";
// import { jwtService } from "../../../src/login/application/jwt-service";
// import { refreshTokenService } from "../../../src/login/application/refresh-token-service";
// import { usersCollectionDB } from "../../../src/users/types/users-collection-DB";
// import { ObjectId } from "mongodb";
// import bcrypt from "bcrypt";
//
// describe("RefreshToken и Logout эндпоинты", () => {
//   const app = express();
//
//   setupApp(app);
//
//   let accessToken: string;
//   let refreshToken: string;
//   let userId: string;
//   let userEmail: string = "igorok@mail.ru";
//   let userLogin: string = "igorok";
//   let userPassword: string = "qwerty";
//
//   // Создаем тестового пользователя перед тестами
//   beforeAll(async () => {
//     // Очищаем коллекцию черного списка
//     await expiredTokensCollection.deleteMany({});
//
//     let hashPassword: string = await bcrypt.hash(userPassword, 10);
//     const User_DB_First: usersCollectionDB = {
//       id: new ObjectId().toString(),
//       login: userLogin,
//       email: userEmail,
//       password: hashPassword,
//       createdAt: new Date().toISOString(),
//       emailConfirmation: {
//         confirmationCode: "rightCode",
//         isConfirmed: false,
//         expirationDate: new Date(),
//       },
//     };
//     await usersCollection.insertOne(User_DB_First);
//
//     accessToken = loginResponse.body.accessToken;
//     refreshToken = loginResponse.headers["set-cookie"][0]
//       .split(";")[0]
//       .split("=")[1];
//     userId = loginResponse.body.userId;
//   });
//
//   afterAll(async () => {
//     // Очистка после тестов
//     await expiredTokensCollection.deleteMany({});
//   });
//
//   describe("/auth/refresh-token (POST)", () => {
//     it("should return 401 if no refresh token provided", async () => {
//       const response = await request(app).post("/auth/refresh-token").send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should return 401 if refresh token is invalid", async () => {
//       const response = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", ["refreshToken=invalid.token.here"])
//         .send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should return 401 if refresh token is expired", async () => {
//       // Создаем истекший токен (нужно мокать или ждать)
//       // Для теста можно создать токен с expiresIn: "1ms" и подождать
//
//       // Простой вариант: используем специальный сервис для создания истекшего токена
//       const expiredToken = await jwtService.createRefreshToken(userId);
//       // Ждем истечения
//       await new Promise((resolve) => setTimeout(resolve, 30));
//
//       const response = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${expiredToken}`])
//         .send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should return 401 if refresh token is blacklisted", async () => {
//       // Добавляем токен в черный список
//       await refreshTokenService.addToBlackList(refreshToken);
//
//       const response = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${refreshToken}`])
//         .send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should successfully refresh tokens with valid refresh token", async () => {
//       // Сначала очищаем черный список
//       await expiredTokensCollection.deleteMany({});
//
//       // Получаем новый refresh token через логин
//       const loginResponse = await request(app).post("/auth/login").send({
//         loginOrEmail: userEmail,
//         password: "Test123456!",
//       });
//
//       const validRefreshToken = loginResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       const response = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${validRefreshToken}`])
//         .send();
//
//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("accessToken");
//       expect(typeof response.body.accessToken).toBe("string");
//
//       // Проверяем, что новый refresh token установлен в cookie
//       const setCookieHeader = response.headers["set-cookie"];
//       expect(setCookieHeader).toBeDefined();
//       expect(setCookieHeader[0]).toContain("refreshToken");
//       expect(setCookieHeader[0]).toContain("HttpOnly");
//     });
//   });
//
//   describe("/auth/logout (POST)", () => {
//     beforeEach(async () => {
//       // Очищаем черный список перед каждым тестом
//       await expiredTokensCollection.deleteMany({});
//     });
//
//     it("should return 401 if no refresh token provided", async () => {
//       const response = await request(app).post("/auth/logout").send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should return 401 if refresh token is invalid", async () => {
//       const response = await request(app)
//         .post("/auth/logout")
//         .set("Cookie", ["refreshToken=invalid.token.here"])
//         .send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should return 401 if refresh token is already blacklisted", async () => {
//       // Получаем токен
//       const loginResponse = await request(app).post("/auth/login").send({
//         loginOrEmail: userEmail,
//         password: "Test123456!",
//       });
//
//       const token = loginResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       // Добавляем в черный список
//       await refreshTokenService.addToBlackList(token);
//
//       const response = await request(app)
//         .post("/auth/logout")
//         .set("Cookie", [`refreshToken=${token}`])
//         .send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should return 401 if refresh token is expired", async () => {
//       // Создаем истекший токен
//       const expiredToken = await jwtService.createRefreshToken(userId);
//       await new Promise((resolve) => setTimeout(resolve, 30));
//
//       const response = await request(app)
//         .post("/auth/logout")
//         .set("Cookie", [`refreshToken=${expiredToken}`])
//         .send();
//
//       expect(response.status).toBe(401);
//     });
//
//     it("should successfully logout with valid refresh token", async () => {
//       // Получаем свежий токен
//       const loginResponse = await request(app).post("/auth/login").send({
//         loginOrEmail: userEmail,
//         password: "Test123456!",
//       });
//
//       const token = loginResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       const response = await request(app)
//         .post("/auth/logout")
//         .set("Cookie", [`refreshToken=${token}`])
//         .send();
//
//       expect(response.status).toBe(204);
//
//       // Проверяем, что cookie был очищен
//       const setCookieHeader = response.headers["set-cookie"];
//       expect(setCookieHeader).toBeDefined();
//       expect(setCookieHeader[0]).toContain("refreshToken=");
//       expect(setCookieHeader[0]).toContain("Max-Age=0");
//
//       // Проверяем, что токен добавлен в черный список
//       const isBlacklisted = await refreshTokenService.findRefreshToken(token);
//       expect(isBlacklisted).toBeTruthy();
//     });
//   });
//
//   describe("Интеграционные тесты: refresh-token и logout вместе", () => {
//     it("should return 401 when using same refresh token after logout", async () => {
//       // 1. Логинимся и получаем токены
//       const loginResponse = await request(app).post("/auth/login").send({
//         loginOrEmail: userEmail,
//         password: "Test123456!",
//       });
//
//       const refreshTokenForTest = loginResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       // 2. Вызываем logout с этим токеном
//       const logoutResponse = await request(app)
//         .post("/auth/logout")
//         .set("Cookie", [`refreshToken=${refreshTokenForTest}`])
//         .send();
//
//       expect(logoutResponse.status).toBe(204);
//
//       // 3. Пытаемся использовать ТОТ ЖЕ токен для refresh
//       const refreshResponse = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${refreshTokenForTest}`])
//         .send();
//
//       // Должен вернуть 401, так как токен уже в черном списке
//       expect(refreshResponse.status).toBe(401);
//     });
//
//     it("should return 401 when using same refresh token after refresh-token", async () => {
//       // 1. Логинимся и получаем токены
//       const loginResponse = await request(app).post("/auth/login").send({
//         loginOrEmail: userEmail,
//         password: "Test123456!",
//       });
//
//       const refreshTokenForTest = loginResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       // 2. Вызываем refresh-token
//       const refreshResponse1 = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${refreshTokenForTest}`])
//         .send();
//
//       expect(refreshResponse1.status).toBe(200);
//
//       // 3. Пытаемся использовать СТАРЫЙ токен снова для refresh
//       const refreshResponse2 = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${refreshTokenForTest}`])
//         .send();
//
//       // Должен вернуть 401, так как старый токен уже в черном списке
//       expect(refreshResponse2.status).toBe(401);
//     });
//
//     it("should return 401 when using same refresh token after refresh-token then logout", async () => {
//       // 1. Логинимся
//       const loginResponse = await request(app).post("/auth/login").send({
//         loginOrEmail: userEmail,
//         password: "Test123456!",
//       });
//
//       const originalRefreshToken = loginResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       // 2. Обновляем токены
//       const refreshResponse = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${originalRefreshToken}`])
//         .send();
//
//       expect(refreshResponse.status).toBe(200);
//
//       // Получаем новый refresh token из cookie
//       const newRefreshToken = refreshResponse.headers["set-cookie"][0]
//         .split(";")[0]
//         .split("=")[1];
//
//       // 3. Логаут с новым токеном
//       const logoutResponse = await request(app)
//         .post("/auth/logout")
//         .set("Cookie", [`refreshToken=${newRefreshToken}`])
//         .send();
//
//       expect(logoutResponse.status).toBe(204);
//
//       // 4. Пытаемся использовать новый токен снова
//       const finalRefreshResponse = await request(app)
//         .post("/auth/refresh-token")
//         .set("Cookie", [`refreshToken=${newRefreshToken}`])
//         .send();
//
//       expect(finalRefreshResponse.status).toBe(401);
//     });
//   });
// });
