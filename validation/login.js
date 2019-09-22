const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput (data){
  let errors = {}; //let can change object over the time, let and var are similar

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  
  if (Validator.isEmpty(data.email)){   //using isEmpty function from validators
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)){  //using isEmail function from validator for email format
    errors.email = 'Invalid Email format';
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'Password must be between 6 and 30 characters';
  }
  if (Validator.isEmpty(data.password)){   //using isEmpty function from validators
    errors.password = 'Password field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  }
}