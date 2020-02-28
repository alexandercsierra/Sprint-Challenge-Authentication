const server = require('../api/server');
const request = require('supertest');
const db = require ('../database/dbConfig');


describe('jokes-router', ()=>{

    describe('Get /', ()=>{
        beforeEach(async () => {
            await db('users').truncate();
          });

        it('should return message without credentials', ()=>{
            return request(server).get('/api/jokes')
                .then(res=>{
                    expect(res.body.you).toBe('no credentials provided')
                })
        })

        it('should return array with access', async()=>{
            let newUser = {username: 'jake', password: 'password'}
            await request(server).post('/api/auth/register').send(newUser)
            let loggedIn = await request(server).post('/api/auth/login').send(newUser)
            // console.log("LOGGED IN", loggedIn.body.token)
            let jokes = await request(server).get('/api/jokes').set('Authorization', loggedIn.body.token);
            // console.log(jokes.body);
            expect(Array.isArray(jokes.body)).toBe(true)
        })

        it('should return array with jokes', async()=>{
            let newUser = {username: 'jake', password: 'password'}
            await request(server).post('/api/auth/register').send(newUser)
            let loggedIn = await request(server).post('/api/auth/login').send(newUser)
            // console.log("LOGGED IN", loggedIn.body.token)
            let jokes = await request(server).get('/api/jokes').set('Authorization', loggedIn.body.token);
            // console.log(jokes.body);
            expect(jokes.body.length).toBeGreaterThan(0)
        })

    })


})