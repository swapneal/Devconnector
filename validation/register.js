const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput (data){
  let errors = {}; //let can change object over the time, let and var are similar

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  
  if (!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.name)){   //using isEmpty function from validators
    errors.name = 'Name field is required';
  }

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
  
  if (Validator.isEmpty(data.password2)){   //using isEmpty function from validators
    errors.password2 = 'Confirm Password field is required';
  }
  if (!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}