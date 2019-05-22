import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import database from "../src/services/database";

describe("/users endpoints", () => {
  before(async () => database.connect());
  after(async () => database.disconnect());

  it("on POST should create an user", async () => {
    const { body } = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send({ name: "Test User" })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(body.name).to.equal("Test User");
  });

  it("on GET should return a list of users", async () => {
    const { body } = await request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(body.length).to.greaterThan(0);
  });

  it("on GET /{userId} should return the specified user", async () => {
    const { body: createdUser } = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send({ name: "Another Test User" })
      .expect("Content-Type", /json/)
      .expect(201);

    const { body: user } = await request(app)
      .get("/api/v1/users/" + createdUser.id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(user.name).to.equal("Another Test User");
  });

  it("on DELETE /{userId} should delete the specified user", async () => {
    const { body: users } = await request(app)
      .get("/api/v1/users")
      .expect(200);

    for (const user of users) {
      await request(app)
        .delete("/api/v1/users/" + user.id)
        .expect(204);
    }
  });
});
