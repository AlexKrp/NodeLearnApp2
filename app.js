const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Load user model
require('./models/user');

//Passport config
require('./config/passport')(passport);

//


//Load Routes
const auth = require('./routes/auth');

//Use express app
const app = express();




//Load keys
const keys = require('./config/keys');

//Mongoose connct
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true
})
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log(err);
});

//GET Index page
app.get('/',(req,res)=>{
    res.send('This is working!');
});


app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


//Passport midleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});



//User Routers
app.use('/auth',auth);



const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});


