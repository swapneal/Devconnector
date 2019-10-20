import axios from 'axios';

const setAuthToken = token => {
  if (token){
    //apply to every request
    axios.defaults.headers.common['Authorization'] = token;   //this places authorization header with token in the axios call
  }
  else{
    delete axios.defaults.headers.common['Authorization']; //this is required for clearing the authorization header with token, in log out
  }
}

export default setAuthToken;