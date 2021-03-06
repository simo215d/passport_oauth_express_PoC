var assert = require('assert')

const models = require('../models/user_models.js');
const findUserByName = require('../models/user_models.js').m1;
const findUserById = require('../models/user_models.js').m2;
const createGoogleUser = require('../models/user_models.js').m3;
const createZealandUser = require('../models/user_models.js').m4;
const verifyPassword = require('../models/user_models.js').m5;

describe('Find bruger i database baseret på username', function(){
    //TC1
    it('Bør find en bruger med username som matcher det username vi indtaster', function(done){
        let username = 'hej@lol.dk';
        findUserByName(username).then((user)=>{
            assert.strictEqual(user.username, username);
            done();
        })
    })
    //TC2
    it('Bør ikke være i stand til at finde en bruger med en username der ikke er registreret i databasen', function(done){
        let username = 'enbrugerderikkefindesidatabasen';
        findUserByName(username).then((user)=>{
            assert.strictEqual(user, null);
            done();
        })
    })  
})

describe('Find bruger i database baseret på id', function(){
    //TC3
    it('Bør ikke kunne finde en bruger hvis ingen bruger med denne id findes', function(done){
        let id = -1;
        findUserById(id).then((user)=>{
            assert.strictEqual(user, null);
            done();
        })
    })
    //TC4
    it('Bør find en bruger med id som matcher det id vi indtaster', function(done){
        let id = 1;
        findUserById(id).then((user)=>{
            assert.strictEqual(user.id, id);
            done();
        })
    })
})

describe('Check om 2 password er ens', function(){
    //TC5
    it('Bør være true, da vi har på forhånd hashed passworded', function(done){
        let htmlPwd = 'asdfg';
        let hashedPwd = '$2b$10$RZMS0Th.ntmF7xuaUYmARO8AZdpX6PpmUWgmeR0DsnMXqtS8gE7.G'
        verifyPassword(htmlPwd, hashedPwd).then((match)=>{
            assert.strictEqual(true, match);
            done();
        })
    })
    //TC6
    it('Bør være false, da hashen er forkert', function(done){
        let htmlPwd = 'asdfg';
        let hashedPwd = 'NOTHASHGOODBAD!??###'
        verifyPassword(htmlPwd, hashedPwd).then((match)=>{
            assert.strictEqual(false, match);
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