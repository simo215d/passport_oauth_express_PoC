const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const becrypt = require('bcrypt');
const findUser = require('../models/user_models.js').m1;
const findUserById = require('../models/user_models.js').m2;
const createGoogleUser = require('../models/user_models.js').m3;
const verifyPassword = require('../models/user_models.js').m5;


//lav cookie fra user baseret på id
passport.serializeUser((user, done)=>{
    console.log('User is being serialized so browser has a cookie so it can be identified!');
    done(null, user.id);
})

//modtager en id fra cookie, så vi kan se om hvem der tilhører id'en
passport.deserializeUser((cookieID, done)=>{
    findUserById(cookieID).then((user)=>{
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
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
        findUser(profile.displayName).then((user)=>{
            if(user==null){
                //redirect user back to login page with faliure message
                console.log("ERROR: USER NOT FOUND---\nSo we create a new google account automaticly");
                createGoogleUser(profile.displayName, profile.id).then((user)=>{
                    done(null, user);
                });
            } else {
                //this function sends us to the next stage which is serializeUser()
                //TODO denne user skal returneres af findUser, så vi kan få id'en og lave en cookie af den.
                console.log("SUCCESS: USER FOUND---\nSUCCESS: USER FOUND---\nSUCCESS: USER FOUND---\n");
                done(null, user);
            }
        });
    })
);

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function(username, password, done) {
            console.log('Youve reached the local strat callback!');
            //når vi prøver at logge ind, skal vi checke om brugeren findes i db
            findUser(username).then(async(user)=>{
                if(user==null){
                    //redirect user back to login page with faliure message
                    console.log("ERROR: USER NOT FOUND---\nERROR: USER NOT FOUND---\nERROR: USER NOT FOUND---\n");
                    return done(null, false, { message: '?error=incorrectusername' });
                } else {
                    console.log("SUCCESS: USER FOUND---\nSUCCESS: USER FOUND---\nSUCCESS: USER FOUND---\n");
                    //let crypt = await becrypt.hash(password, 10)
                    //user exists in the database, now check if the password matches
                    verifyPassword(password, user.password).then((match)=>{
                        if(match){
                            return done(null, user, { message: '?error=none' });
                        } else {
                            return done(null, false, { message: '?error=incorrectpassword' });
                        }
                    })
                }
            });
        }
    )
);