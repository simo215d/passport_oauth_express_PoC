var express = require('express');
const passport = require('passport');
const passportSetup = require('../config/passport_setup');
var router = express.Router();
const createZealandUser = require('../models/user_models.js').m4;


router.get('/', function(req, res, next) {
    res.render('signup');
});

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/zealandconnect', function(req, res, next) {
    let errormsg = req.query.error;
    if(errormsg=='useralreadyexists'){
        res.render('zealandconnectsignup',{errormsg: 'Denne bruger findes allerede!'});
    } else res.render('zealandconnectsignup');
});

router.post('/zealand', function(req, res, next) {
    console.log('THIS IS THE REQUEST OBJECt');
    console.log(req.body);
    createZealandUser(req.body.email, req.body.password).then((user)=>{
        if(user==null){
            res.redirect('/signup/zealandconnect?error=useralreadyexists')
            console.log('HEJ JEG TAGER IMOD POST FRA ZEALANDCREATE. JEG FIK NULL FRA CREATE METODEN');
            console.log('HEJ JEG TAGER IMOD POST FRA ZEALANDCREATE. JEG FIK NULL FRA CREATE METODEN');
            console.log('HEJ JEG TAGER IMOD POST FRA ZEALANDCREATE. JEG FIK NULL FRA CREATE METODEN');
            console.log('HEJ JEG TAGER IMOD POST FRA ZEALANDCREATE. JEG FIK NULL FRA CREATE METODEN');
        } else res.redirect('/auth/zealandconnect');
    })
});

module.exports = router;