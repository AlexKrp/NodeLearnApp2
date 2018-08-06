const express = require('express');
const router = express.Router();

//GET Index page
router.get('/',(req,res)=>{
    res.render('index/welcome');
});

//GET Dashbord page
router.get('/dashboard',(req,res)=>{
    res.render('index/dashboard');
});




module.exports = router;