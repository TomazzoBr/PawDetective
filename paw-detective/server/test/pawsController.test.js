const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const Paws = require('../models/paws.models');

const mongoose = require('mongoose');
const dbTest = 'test';

describe ('Integration tests', () => {

    const app = express();
    app.use(express.json());
    app.use(router);
    const request = supertest(app);

    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${dbTest}`;
        await mongoose.connect(url, {useNewUrlParser: true});
    });

    afterEach(async () => {
        await Paws.deleteMany();
    });

    it('should save a paw to the database', async (done) => {

        const pawObj = {
            lostOrFound: false,
            picture: "https://cdn.britannica.com/q:60/59/173659-131-464B9889/Animal-Mammal-Goat-Ruminant-goat-Capra-aegagrus.jpg",
            animal: "Other",
            description: "this is a test",
            date: Number(Date.now),
            location: "Barcelona",
            lat: 41.394799,
            long: 2.197904,
        };
        const res = await request.post('/paws', )
        .send({pawObj});

        const paw = await Paws.findOne({pawObj});
        expect(paw.pawObj.toBe(pawObj))
        done()
    })
})