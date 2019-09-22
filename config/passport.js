const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require ('./keys');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      //console.log(payload);
      User.findById(payload.id)
      .then(user => {
        if (user){
          return done(null, user); //done is builtin call back function in passport
        }
        return done(null, false); //this is valid for user deletion before the time out expires
      })
      .catch(err => console.log(err));
    })
  )
}