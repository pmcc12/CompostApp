import app from '../src/server';
import supertest from 'supertest';
const request = supertest(app)

describe('SEll endpoint', () => {

    it("POST /product", async () => {
        const res = await request.post('/register').send({
            "orderNumber" : 2,
            "title" : "mock product",
            "images" : "mock image",
            "desc": "mock desc",
            "retailPrice" : 2.2,
            "negotiable" : true,
            "availableQuantity": 2,
            "readyDate": "fasdfasdf"
        })
        expect(res.status).toBe(201)
        expect(res.body.message).toBe('User created successful')
    });
})
