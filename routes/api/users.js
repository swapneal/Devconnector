const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


const router = express.Router();



const User = require('../../models/User');

// router.get('/test', (req,res) => res.json({
//   msg:'Inside Users test page' - to verify route is in users page
 
// }));

// @route POST api/users/register
// @desc Register a user
// @access public route 
router.post('/register', (req,res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      return res.status(400).json({   //using BAD request response code of 400, if status is not provided then executed code will be status 200
        email: 'Email already exists'  //this email variable is unique from above email variable as this is for response
      })
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
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({email}).then(user => {
    if (!user){
      return res.status(404).json({
        msg: 'Email not found'
      })
    }
  }).catch(err => console.log('Error in user email: '+ err));
})


module.exports = router;