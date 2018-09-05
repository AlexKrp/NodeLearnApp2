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
    .sort({date: 'desc'})
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
    .populate('comments.commentUser')
    .then(story => {
        if(story.status == 'public'){
            res.render('stories/show', {
                story: story
            });
        } else {
            if(req.user){
                if(req.user.id == story.user._id){
                    res.render('stories/show', {
                        story: story
                    });
                } else {
                    res.redirect('/stories');
                }
            } else {
                res.redirect('/stories');
            }
        }
        
    })
    .catch(err => console.log(err));
});

//Show logged in user stories
router.get('/user/:userId',(req,res)=>{
    Story.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index',{
            stories: stories
        });
    })
    .catch(err=>console.log(err));
});

//List stories from a user

router.get('/user/:userId',(req,res)=>{
    Story.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index',{
            stories: stories
        });
    })
    .catch(err=>console.log(err));
});

router.get('/edit/:id',(req,res)=>{
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        if(story.user != req.user.id){
            res.redirect('/stories');
        } else {
        res.render('stories/edit', {
            story: story
        }); 
        }
    })
    .catch(err => console.log(err));
    
});

//Edited Story  PUT
router.put('/:id',(req,res)=>{
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        let allowComments = false;
        if(req.body.allowComments){
        allowComments = true;
        }

        //New Values
        story.title = req.body.title;
        story.body = req.body.body;
        story.status = req.body.status;
        story.allowComments = allowComments;
        
        story.save()
        .then(story => {
            res.redirect('/dashboard')
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//DELETE STORY

router.delete('/:id',(req,res)=>{
    Story.remove({
        _id: req.params.id
    })
    .then(()=>{
        res.redirect('/dashboard');
    })
});

//Add Comment
router.post('/comment/:id',(req,res)=>{
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }
        //Add to comments array
        story.comments.unshift(newComment);

        story.save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`);
        })
        .catch(err => console.log(err))
    })
    .catch(err=>console.log(err));
})


module.exports = router;