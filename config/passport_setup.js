const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const findUser = require('../models/user_models.js');

passport.use(
    new GoogleStrategy({
        //options for google strat
        callbackURL:'http://localhost:3000/auth/google/redirect',
        clientID: '355832749697-3c12vop7707aq3bi5osp47admunsal8f.apps.googleusercontent.com',
        clientSecret: 'BpaPCoWamTFhdGftBuvd6hfu'
    }, (accessToken, refreshToken, profile, done)=>{
        //passport callback function
        console.log('passport callback fired:');
        console.log(profile);
        //vi kan nu bruge denne profil id, til at undersøge i vores database om han findes hos os.
        //brugeren får ikke en response før denne funktion er færdig, så vi har god tid til at kontrollere
        //
        //findes vores bruger i databasen:
        findUser('Mokkil');
    })
)