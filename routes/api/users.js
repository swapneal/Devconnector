const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const router = express.Router();



const User = require('../../models/User');

// router.get('/test', (req,res) => res.json({
//   msg:'Inside Users test page' - to verify route is in users page
 
// }));

// @route POST api/users/register
// @desc Register a user
// @access public route 
router.post('/register', (req,res) => {

  const {errors, isValid} = validateRegisterInput(req.body);

  //using validators
  if (!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
      //   {   //using BAD request response code of 400, if status is not provided then executed code will be status 200
      //   email: 'Email already exists'  //this email variable is unique from above email variable as this is for response
      // })
    } else {
     // return res.status(200).json({msg: 'success'});
      
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, //plain text password
        avatar, //in JS, if variable name in LHS is same as RHS then you can just use a variable name, instead of avatar: avatar 
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash; //hashed password
          newUser.save().then( user => res.json(user)).catch(err => console.log('Error in saving hashed password: ') + err);
        })  //
      }); //callback function

    }
  })
  .catch(err => console.log('unique email check: '+err))
});


// @route POST api/users/login
// @desc user login, return JWT token
// @access public route 
router.post('/login', (req, res) => {
  
  const {errors, isValid} = validateLoginInput(req.body);

  //using validators
  if (!isValid){
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
 

  //find user by email
  User.findOne({email}).then(user => {
    if (!user){
      errors.email = 'User not found';
      return res.status(400).json(errors);
      
      // return res.status(404).json({
      //   email: 'User not found'
      // });
    } 
    bcrypt.compare(password, user.password)   //password is plain text, user.password is the encrypted password stored in db
     .then(isMatch => {
       if (!isMatch){
        errors.password = 'Password does not match';
        return res.status(400).json(errors);
        
        // return res.status(400).json({
        //    password: 'Password does not match'
        //  });
       }
       const payload = {
         id: user.id,
         name: user.name,
         avatar: user.avatar
       };
       jwt.sign(
         payload, 
         keys.secretOrKey,
         {expiresIn: 3600},
         (err, token) => {
           if (err) throw err;

           return res.json({
             success: true,
             token: 'Bearer ' + token
           })
         }
         )
     //  return res.json(payload);
     }) 
     .catch(err => console.log('Error in password comparsion: '+ err));
  }).catch(err => console.log('Error in user email: '+ err));
})

// @route GET api/users/current
// @desc return current user
// @access private route which will have 3 parameter function with route name, passport authenticate and if authenticate successful, then arrow function 
router.get(
  '/current', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
   // res.json({msg: 'success'});
    res.json({
      id: req.user.id,                 //req.user will provide data from passport
      email: req.user.email,
      name: req.user.name
    });
})



module.exports = router;