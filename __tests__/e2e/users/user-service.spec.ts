import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { usersService } from "../../../src/users/application/users-service";
import { UserInputModel } from "../../../src/users/types/UserInputModel";
import {
  NodemailerService,
  NodemailerService,
} from "../../../src/login/nodemaierService/sendEmail";

jest.setTimeout(30000);
describe("integration test for usersService", () => {
  let mongoTestServer: MongoMemoryServer;
  beforeAll(async () => {
    mongoTestServer = await MongoMemoryServer.create();
    const mongoUri = mongoTestServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoTestServer.stop();
  });

  const emailAdapterMock: jest.Mocked<NodemailerService> = {
    sendEmail: jest.fn(),
    confirmEmail: jest.fn(),
  };

  describe("create", () => {
    let user: UserInputModel = {
      login: "igor",
      password: "123",
      email: "igor@igor.com",
    };
    let codeForTest = "testing code";

    it("sendEmail should called", async () => {
      const spy = jest.spyOn(NodemailerService, "sendEmail");
      const result = await NodemailerService.sendEmail(user.email, codeForTest);

      expect(spy).toHaveBeenCalled();
    });
    it("should create user", async () => {
      const result = await usersService.create(user);

      expect(result!.login).toBe("igor");
      expect(result!.email).toBe("igor@igor.com");
    });
  });
});
