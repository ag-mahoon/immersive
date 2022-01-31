const db = require('../../models');
const app = require('../app');
const supertest = require("supertest");
const createToken = require('../utils/createToken');

describe('test dashboard - welcom', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    })

    it('welcom api can not be accessible for unauthenticated users', async () => {
        const response = await supertest(app).get("/api/welcome");
        expect(response.status).toEqual(403);
        expect(response.body).toMatchObject({
            "error": "A token is required for authentication"
        });
    });

    it('Welcome api is not available for expire or invalid token', async () => {
        const faketoke = "fake token";
        const response = await supertest(app)
            .get("/api/welcome")
            .set('Accept', 'application/json')
            .set('x-access-token', faketoke);
        expect(response.status).toEqual(401);
        expect(response.body).toMatchObject({ "error": "Invalid Token" });
    });

    it('successfully access welcome api with authenticated user.', async () => {
        const user = {
            email: "authorized@test.com",
            _id: 1,
            role: "anyrole"
        };
        const token = createToken(user);
        const response = await supertest(app)
            .get("/api/welcome")
            .set('Accept', 'application/json')
            .set('x-access-token', token);

        expect(response.status).toEqual(200);
        expect(response.body.message).toBe("Welcome");
    });
});