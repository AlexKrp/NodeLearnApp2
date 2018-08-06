const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../helpers/auth');

//GET Index page
router.get('/',ensureGuest,(req,res)=>{
    res.render('index/welcome');
});

//GET Dashbord page
router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('index/dashboard');
});

//About page
router.get('/about',(req,res)=>{
    res.render('index/about');
});




module.exports = router;