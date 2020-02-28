const server = require('../api/server');
const request = require('supertest');
const db = require ('../database/dbConfig');

describe('auth-router', ()=>{

    describe('POST /register', ()=>{
        beforeEach(async () => {
            await db('users').truncate();
          });

        it('should return status 500 with invalid user object', ()=>{
            return request(server).post('/api/auth/register')
                .send({username: 'bob'})
                .then(res=>{
                    expect(res.status).toBe(500);
                })
        })


        it('should return status 201 with new user', ()=>{
            return request(server).post('/api/auth/register')
                .send({username: 'bob', password: 'pass'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })

    })


    describe('POST /login', ()=>{

        it('should return status 200 with valid login', ()=>{
            return request(server).post('/api/auth/login')
                .send({username: 'bob', password: 'pass'})
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })

        it('should return status 401 with invalid credentials', ()=>{
            return request(server).post('/api/auth/login')
                .send({username: 'sandra', password: 'password'})
                .then(res=>{
                    expect(res.status).toBe(401);
                })
        })



    })






})