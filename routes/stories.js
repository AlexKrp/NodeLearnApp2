const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuth,ensureGuest} = require('../helpers/auth');

//Import Story Model

//Stories Index
router.get('/',(req,res)=>{

    Story.find({status:'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index',{
            stories: stories
        });
    })

    
});

// Add story from
router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add');
});

//Add story POST
router.post('/',ensureAuth,(req,res)=>{
    let allowComments = false;
    if(req.body.allowComments){
        allowComments = true;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    //Create Story in DB
    new Story(newStory)
    .save()
    .then(story => {
        res.redirect(`/stories/show/${story.id}`);
    })
    .catch(err => console.log(err));



});

//Show Single story
router.get('/show/:id',(req,res) => {
    Story.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(story => {
        res.render('stories/show', {
            story: story
        });
    })
    .catch(err => console.log(err));
});


module.exports = router;