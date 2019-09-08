const express = require('express'); //import express
const mongoose = require('mongoose'); //import mongoose

//db config
const db = require('./config/keys').mongoURI; //here we have import the only required key from config file

//connect to mongoDB  
mongoose.connect(db).then(() => console.log('mongodb connection successful')).catch(err => console.log('mongodb connection failed: '+ err));

//then catch is a promise statement

const app = express(); //creating instance of express

app.get('/', (req,res) => res.send('hello')); //creating first route - get route. '/' is home page, execute arrow function. Basically this is GET request

const port = 5800; //create a port to make express to listen on this port

app.listen(port, () => console.log(`server running on port ${port}`)); //express will listen on the port


