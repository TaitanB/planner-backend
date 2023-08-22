const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const User = require("../../models/user");

const { DB_HOST } = process.env;

describe("login controller", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001);
    mongoose.connect(DB_HOST);
  });

  it("should return Unauthorized error 401", async () => {
    const testData = {
      email: "fabomec655@fulwark.com",
      password: "test1111",
    };

    const response = await request(app).post("/api/users/login").send(testData);

    expect(response.statusCode).toBe(401);
  });

  it("should return Unauthorized error 401", async () => {
    const testData = {
      email: "fabomec654@fulwark.com",
      password: "test1112",
    };

    const response = await request(app).post("/api/users/login").send(testData);

    expect(response.statusCode).toBe(401);
  });

  it("should return verified/unverified email statusCode 200/401", async () => {
    const testData = {
      email: "fabomec654@fulwark.com",
      password: "test1111",
    };

    const user = await User.findOne({ email: testData.email });
    const isEmailVerified = user.verify;

    const response = await request(app).post("/api/users/login").send(testData);

    if (isEmailVerified) {
      expect(response.statusCode).toBe(200);
    } else {
      expect(response.statusCode).toBe(401);
    }
  });

  it("should return token and user name, email and password", async () => {
    const testData = {
      email: "fabomec654@fulwark.com",
      password: "test1111",
    };

    const response = await request(app).post("/api/users/login").send(testData);

    const {
      _body: { token, user },
    } = response;

    expect(response.statusCode).toBe(200);

    expect(token).not.toBe(undefined);

    expect(user).toHaveProperty("name");
    expect(typeof user.name).toBe("string");

    expect(user).toHaveProperty("email");
    expect(typeof user.email).toBe("string");

    expect(user).toHaveProperty("subscription");
    expect(typeof user.subscription).toBe("string");
  });

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
});
