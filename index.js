const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');
const port = 8000;

app.use(express.static('./assets'));

app.use(expresslayouts);

// extract styles and scripts from the subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes/index'));


// setup view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on the port : ${port}`);
})
