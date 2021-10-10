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
        expect(res.status).toBe(201)
        expect(res.body.message).toBe('User created successful')
    });

    it("POST /login", async () => {
        const res = await request.post('/login').send({
            email: "mock.user@gmail.com",
            password: "123456"
        })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('User login successful')
    });

})
