import db from '../../models';
import app from '../app';
import supertest from 'supertest';
import createToken from '../utils/createToken';

const fakeUser = {
  email: "authorized@test.com",
  _id: 1,
  role: "admin",
};

const authorizedToken = createToken(fakeUser);

describe("test company routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it("company api can not be accessible for unauthenticated users", async () => {
    const response = await supertest(app).get("/api/companies");
    expect(response.status).toEqual(403);
    expect(response.body).toMatchObject({
      error: "A token is required for authentication",
    });
  });

  it("company api cant not be accessible to unauthorized user", async () => {
    const user = {
      email: "authorized@test.com",
      _id: 1,
      role: "anyrole",
    };
    const token = createToken(user);
    const response = await supertest(app)
      .get("/api/companies")
      .set("Accept", "application/json")
      .set("x-access-token", token);
    expect(response.status).toEqual(403);
    expect(response.body).toMatchObject({
      error: "Not authorize to perform this operation",
    });
  });

  it("successfully empty get companies data with authorized user.", async () => {
    const response = await supertest(app)
      .get("/api/companies")
      .set("Accept", "application/json")
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("Compan can not be created with name", async () => {
    const response = await supertest(app)
      .post("/api/companies")
      .set("Accept", "application/json")
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      errors: [
        {
          msg: "Company name is required.",
          param: "name",
          location: "body",
        },
      ],
    });
  });

  it("successfully get companies data with authorized user when there records", async () => {
    const company = {
      name: "fake name",
    };

    const newCompany = await db.companies.create(company);

    const employee = {
      firstName: "fake first name",
      lastName: "fake last name",
      CompanyId: newCompany.id,
    };
    const newEmployee = await db.employees.create(employee);

    const response = await supertest(app)
      .get("/api/companies")
      .set("Accept", "application/json")
      .set("x-access-token", authorizedToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].name).toEqual("fake name");
    expect(response.body[0].Employees).toHaveLength(1);
    expect(response.body[0].Employees[0].firstName).toEqual("fake first name");
    expect(response.body[0].Employees[0].lastName).toEqual("fake last name");
  });
});
