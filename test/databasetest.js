var assert = require('assert')

const findUserByName = require('../models/user_models.js').m1;
const findUserById = require('../models/user_models.js').m2;
const createGoogleUser = require('../models/user_models.js').m3;
const createZealandUser = require('../models/user_models.js').m4;

describe('Find bruger i database baseret på username', function(){
    it('Bør find en bruger med username som matcher det username vi indtaster', function(done){
        let username = 'hej@lol.dk';
        findUserByName(username).then((user)=>{
            assert.strictEqual(user.username, username);
            done();
        })
    })
    it('Bør ikke være i stand til at finde en bruger med en username der ikke er registreret i databasen', function(done){
        let username = 'enbrugerderikkefindesidatabasen';
        findUserByName(username).then((user)=>{
            assert.strictEqual(user, null);
            done();
        })
    })  
})

describe('Find bruger i database baseret på id', function(){
    it('Bør find en bruger med id som matcher det id vi indtaster', function(done){
        let id = 1;
        findUserById(id).then((user)=>{
            assert.strictEqual(user.id, id);
            done();
        })
    })
    it('Bør ikke kunne finde en bruger hvis ingen bruger med denne id findes', function(done){
        let id = -1;
        findUserById(id).then((user)=>{
            assert.strictEqual(user, null);
            done();
        })
    })
})

describe('Opret en googlebruger i systemet og så check at den eksisterer', function(){
    it('Bør oprette google bruger og kunne finde brugeren baseret på username', function(done){
        let username = 'benny';
        let googleID = 69420;
        createGoogleUser(username, googleID).then(()=>{
            findUserByName(username).then((user)=>{
                assert.strictEqual(user.username, username);
                done();
            })
        });
    })
    it('Bør oprette zealand bruger og kunne finde brugeren baseret på username', function(done){
        let username = 'benny';
        let password = 'blabla123';
        createZealandUser(username, password).then(()=>{
            findUserByName(username).then((user)=>{
                assert.strictEqual(user.username, username);
                done();
            })
        });
    })
})