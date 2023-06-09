const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expresslayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');
// used for session-cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expresslayouts);

// extract styles and scripts from the subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setup view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'connecti',
    // TODO change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({mongoUrl: 'mongodb://0.0.0.0/codeial_development'},
        function(err){
            console.log(err || 'connect-mongoDB setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on the port : ${port}`);
});
