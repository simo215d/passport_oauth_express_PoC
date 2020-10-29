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
    res.render('zealandconnectsignup');
});

router.post('/zealand', function(req, res, next) {
    console.log('THIS IS THE REQUEST OBJECt');
    console.log(req.body);
    createZealandUser(req.body.email, req.body.password);
    res.redirect('/auth/zealandconnect');
});

module.exports = router;