const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../helpers/auth');



//Stories Index
router.get('/',(req,res)=>{
    res.render('stories/index');
});

// Add story from
router.get('/add',ensureAuth,(req,res)=>{
    
});

//Add post
router.post('/',ensureAuth,(req,res)=>{
    
});



module.exports = router;