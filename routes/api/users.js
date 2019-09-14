const express = require('express');

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
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      });
    }
  })
  .catch(err => console.log('unique email check: '+err))
});

module.exports = router;