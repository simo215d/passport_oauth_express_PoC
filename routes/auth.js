var express = require('express');
const passport = require('passport');
const passportSetup = require('../config/passport_setup');
var router = express.Router();

router.get('/login', function(req, res, next) {
    //REQUEST PARAMETERS:
    let error = req.query;
    console.log("\n"+JSON.stringify(error)+"\n");
    let msg = error.error;
    console.log("THIS ERROR "+msg);
    switch(msg){    
        case 'usernotfound': res.render('login', { title: 'Din google account findes ikke i vores system gå til opret bruger for at oprette dig i systemet.' }); break;
        default: res.render('login'); break;
    }
});

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.post('/zealand', passport.authenticate('local',{ successRedirect: '/profiles', failureRedirect: '/auth/login?error=usernotfound'}));
//denne her kan bruges til at debugge :)
/*router.post('/zealand', function(req, res, next) {
    console.log('YO her er din request som kom fra vores form :');
    console.log(req.url);
    passport.authenticate('local', function(err, user, info) {
        console.log("authenticate");
        console.log(err);
        console.log(user);
        console.log(info);
    })(req, res, next);
});*/

router.get('/zealandconnect', function(req, res, next){
    res.render('zealandconnectlogin');
});

//callback route for google to redirect to. Profile info findes i vores url som findes efter man er blevet redirected
router.get('/google/redirect/', passport.authenticate('google', { failureRedirect: '/auth/login?error=usernotfound' }), (req, res)=> {
    //res.send(req.user);  returnere objektet som er linket til sessionen
    res.redirect('/profiles')
});

module.exports = router;