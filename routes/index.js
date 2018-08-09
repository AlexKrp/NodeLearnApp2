const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');


//GET Index page
router.get('/',ensureGuest,(req,res)=>{
    res.render('index/welcome');
});

//GET Dashbord page
router.get('/dashboard',ensureAuth,(req,res)=>{
    Story.find({
        user: req.user.id
    })
    .then(stories => {
        res.render('index/dashboard',{
            stories: stories
        });
    })
});

//About page
router.get('/about',(req,res)=>{
    res.render('index/about');
});




module.exports = router;