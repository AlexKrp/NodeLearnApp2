const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//PAssport config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

const app = express();

//GET Index page
app.get('/',(req,res)=>{
    res.send('This is working!');
});




//User Routers
app.use('/auth',auth);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});


