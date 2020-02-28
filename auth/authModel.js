module.exports = {
    add,
    findBy
}

const db = require('../database/dbConfig');

function add(user){
    return db('users').insert(user);
}

function findBy(username){
    return db('users').where({username});
}

