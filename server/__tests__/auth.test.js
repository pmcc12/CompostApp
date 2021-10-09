import app from '../src/server';
import supertest from 'supertest';
const request = supertest(app)

describe('Authentication endpoint', () => {

    it("POST /register", async () => {
        const res = await request.post('/register').send({
            email: "mock.user@gmail.com",
            username: "mockUser",
            password: "123456"
        })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('pass!')
    });

    it("POST /login", async () => {
        const res = await request.post('/register').send({
            email: "mock.user@gmail.com",
            password: "123456"
        })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('pass!')
    });

})
