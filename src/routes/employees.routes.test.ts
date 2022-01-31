import db from '../../models';
import app from '../app';
import supertest from 'supertest';
import createToken from '../utils/createToken';
import { IUser } from '../utils/user';

const fakeUser = {
  email: "authorized@test.com",
  _id: 1,
  role: "admin",
};

const authorizedToken = createToken(fakeUser);

describe("test employee routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it("employee api can not be accessible for unauthenticated users", async () => {
    const response = await supertest(app).get("/api/employees/fakeid");
    expect(response.status).toEqual(403);
    expect(response.body).toMatchObject({
      error: "A token is required for authentication",
    });
  });

  it("employee api cant not be accessible to unauthorized user", async () => {
    const user = {
      email: "authorized@test.com",
      _id: 1,
      role: "anyrole",
    };
    const token = createToken(user);
    const response = await supertest(app)
      .get("/api/employees/fakeid")
      .set("Accept", "application/json")
      .set("x-access-token", token);
    expect(response.status).toEqual(403);
    expect(response.body).toMatchObject({
      error: "Not authorize to perform this operation",
    });
  });

  it("Successfully get employees data", async () => {
    const response = await supertest(app)
      .get("/api/employees/fakeid")
      .set("Accept", "application/json")
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(0);
  });

  it("Employee can not be created without first name", async () => {
    const employe = {
      lastName: "fake last name",
    };
    const response = await supertest(app)
      .post("/api/employees/companyid")
      .set("Accept", "application/json")
      .send(employe)
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      errors: [
        {
          msg: "Employee first name is required.",
          param: "firstName",
          location: "body",
        },
      ],
    });
  });

  it("Employee can not be created without last name", async () => {
    const employe = {
      firstName: "fake last name",
    };
    const response = await supertest(app)
      .post("/api/employees/companyid")
      .set("Accept", "application/json")
      .send(employe)
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      errors: [
        {
          msg: "Employee last name is required.",
          param: "lastName",
          location: "body",
        },
      ],
    });
  });

  it("Employee can not be created without company", async () => {
    const employe = {
      firstName: "fake last name",
      lastName: "fake last name",
    };
    const response = await supertest(app)
      .post("/api/employees/companyid")
      .set("Accept", "application/json")
      .send(employe)
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      message: "No company found for given id companyid",
    });
  });
});
