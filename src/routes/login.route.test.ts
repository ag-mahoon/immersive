import db from '../../models';
import app from '../app';
import supertest from 'supertest';

describe('test login feature', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    })

    it('login attempt without username through 400 error', async () => {
        const response = await supertest(app).post("/api/login");
        expect(response.status).toEqual(400);
        expect(response.body).toMatchObject({
            "errors": [{
                "msg": "Email is required",
                "param": "email",
                "location": "body"
            }]
        });
    });

    it('Wrong username or password provided.', async () => {
        const response = await supertest(app)
            .post("/api/login")
            .send({ email: "fake@test.com", password: "test" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
        expect(response.body).toMatchObject({ "error": "Invalid Credentials" });
    });

    it('successfully login with correct credentials', async () => {
        const response = await supertest(app)
            .post("/api/login")
            .send({ email: "test@test.com", password: "password" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.token).not.toBe(undefined);
        expect(response.body._id).toBe(1);
        expect(response.body.role).toBe("admin");
    });
});