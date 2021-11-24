import express from 'express';
import router from '../router';
import supertest from 'supertest';
import Paws from '../models/paws.models';
import mongoose from 'mongoose';

const dbTest = 'test';
const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);

const validObj = {
    lostOrFound: false,
    picture: "https://cdn.britannica.com/q:60/59/173659-131-464B9889/Animal-Mammal-Goat-Ruminant-goat-Capra-aegagrus.jpg",
    animal: "Other",
    description: "this is a test",
    date: Number(Date.now),
    location: "Barcelona",
    lat: 41.394799,
    long: 2.197904,
};

describe ('Server Responses Test', () => {
    
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${dbTest}`;
        await mongoose.connect(url);
    });

    afterEach(async () => {
        await Paws.deleteMany();
    });

    it('Should return 200 when GET valid endpoint', async () => {
        const res = await request.get('/paws');
        expect(res.status).toBe(200);
    })
    it('Should return 404 when GET invalid endpoint', async () => {
        const res = await request.get('/invalidRoute');
        expect(res.status).toBe(404);
    })
    
    it('Should return 201 when POST valid object', async () => {
        const res = await request.post('/paws').send(validObj);
        expect(res.status).toBe(201);
    })

    it('Should return 204 when DELETE valid endpoint', async () => {
        const post = await request.post('/paws').send(validObj);
        const id = post.body._id

        const res = await request.delete(`/paws/${id}`);
        expect(res.status).toBe(204);
    })
})

describe ('Database dataflow test', () => {
    
    const app = express();
    app.use(express.json());
    app.use(router);
    const request = supertest(app);
    
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${dbTest}`;
        await mongoose.connect(url);
    });
    
    afterEach(async () => {
        await Paws.deleteMany();
    });

    it('should GET a paw from database', async () => {
    
        const res = await request.get('/paws');
        console.log(res.body)
        expect(Array.isArray(res.body)); 
    })

    it('should POST a paw to the database', async () => {
    
        const res = await request.post('/paws').send(validObj);
    
        expect(res.body.picture).toBe(validObj.picture);
        expect(res.body.animal).toBe(validObj.animal);
        expect(res.body.lat).toBe(validObj.lat);
        expect(res.body.long).toBe(validObj.long); 
    })
    
    it('should DELETE a paw from the database', async () => {
        const post = await request.post('/paws').send(validObj);
        const id = post.body._id;

        await request.delete(`/paws/${id}`);
        const res = await request.get('/paws');
        expect(res.body).toEqual([]);
    })
})