const express = require('express');
const mongoose = require('mongoose');

const app = express();

//GET Index page
app.get('/',(req,res)=>{
    res.send('This is working!');
});






const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});


