const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google',
{scope: ['profile','email']}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=> {
    // Successful authentication, redirect user dashboard.
    res.redirect('/bashboard');
  });

router.get('/verify',(req,res)=>{
    console.log(req.user)
    if(req.user){
       
    } else {
    
    }
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});
module.exports = router;