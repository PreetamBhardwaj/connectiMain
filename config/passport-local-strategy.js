const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function(email,password,done)
    {
        //find a user and establish its identity
        console.log('email PSL : ',email);
        try{
            let user = await User.findOne({email: email});

            if(!user || user.password != password)
            {
                console.log('Invalid Username/Password');
                return done(null,false);
            }

            console.log("User1-PLS : ",user);
            return done(null,user);
        }
        catch(err)
        {
            console.log('Error in finding user --> Passport');
                return done(err);
        }
    }
));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user._id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(
    async function(id, done){
        try{
            let user = await User.findById(id);
            return done(null, user);
        }
        catch(err)
        {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
    }
);


//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie  and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;