const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


//Load user and story model
require('./models/user');
require('./models/story');

//Passport config
require('./config/passport')(passport);

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

//Use express app
const app = express();

//Body Parser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Handlebars Helpers
const {
    truncate,
    stripTags,
    formatDate
} = require('./helpers/hbs');

//Handlebars Middleware
app.engine('handlebars',exphbs({
    helpers: {
       truncate: truncate,
       stripTags: stripTags,
       formatDate: formatDate 
    },
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

//Middleware required by passport
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

//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

//Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');




//User Routers
app.use('/',index);
app.use('/auth',auth);
app.use('/stories',stories);

//Heroku port or 5000
const port = process.env.PORT || 5000;

//App port listen
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});


