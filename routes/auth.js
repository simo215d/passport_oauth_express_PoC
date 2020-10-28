var express = require('express');
const passport = require('passport');
const passportSetup = require('../config/passport_setup');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

//callback route for google to redirect to. Profile info findes i vores url som findes efter man er blevet redirected
router.get('/google/redirect/', passport.authenticate('google'), (req, res)=> {
    //res.send(req.user);  returnere objektet som er linket til sessionen
    res.redirect('/profiles')
});

module.exports = router;