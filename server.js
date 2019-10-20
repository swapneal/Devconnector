const express = require('express'); //import express
const mongoose = require('mongoose'); //import mongoose
const passport = require('passport'); //import passport for authentication
const path = require('path');

//create routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

//body parser
const bodyParser = require('body-parser');



//db config
const db = require('./config/keys').mongoURI; //here we have import the only required key from config file

const app = express(); //creating instance of express

//connect to mongoDB  
mongoose.connect(db).then(() => console.log('mongodb connection successful')).catch(err => console.log('mongodb connection failed: '+ err));

//then-catch is a promise statement


//body parser middleware
app.use(bodyParser.urlencoded({extended: false})); //using default form of encoding in the url
app.use(bodyParser.json()); //using json while passing the data


//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport); //this line is same as const passport = require('./config/passport');



app.get('/', (req,res) => res.send('hello')); //creating first route - get route. '/' is home page, execute arrow function. Basically this is GET request

//defining routes in express
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = 5800; //create a port to make express to listen on this port

app.listen(port, () => console.log(`server running on port ${port}`)); //express will listen on the port

