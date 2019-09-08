const express = require('express'); //import express
const mongoose = require('mongoose'); //import mongoose

//create routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

//db config
const db = require('./config/keys').mongoURI; //here we have import the only required key from config file

//connect to mongoDB  
mongoose.connect(db).then(() => console.log('mongodb connection successful')).catch(err => console.log('mongodb connection failed: '+ err));

//then catch is a promise statement

const app = express(); //creating instance of express

app.get('/', (req,res) => res.send('hello')); //creating first route - get route. '/' is home page, execute arrow function. Basically this is GET request

//defining routes in express
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 5800; //create a port to make express to listen on this port

app.listen(port, () => console.log(`server running on port ${port}`)); //express will listen on the port


