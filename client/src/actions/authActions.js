import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { decode } from 'punycode';

//Register user action
export const registerUser = (userData, history) => dispatch => {
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/login'))   //history actions, moving to login component
      .catch(err => dispatch({   // calling error reducer 
        type: GET_ERRORS,
        payload: err.response.data
      }));  
}

//{
//   return {
//     type: SET_CURRENT_USER,
//     payload: userData
//   }
// }

//axios is a way to call the api and relay the values. fetch is another way to do the same
    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({
    //     errors: err.response.data
    //   })


    export const loginUser = userData => dispatch => {
          //axios is a way to call the api and relay the values. fetch is another way to do the same
    axios
    .post('/api/users/login', userData)
    .then(res => {
      //upon successful login, save the token to local(browser) storage
      const {token} = res.data; //{} deconstructor
      localStorage.setItem('jwtToken', token)

      //set token to auth header
      setAuthToken(token);

      //decode token to get userdata
      const decoded = jwt_decode(token);


      //store userdate in redux
      dispatch(setCurrentUser(decoded));


    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
    }

    export const setCurrentUser = (decoded) => {
      return {
        type: SET_CURRENT_USER,
        payload: decoded
      }
    }

    export const logoutUser = () => dispatch => {
      //remove token from local (browser) storage 
      localStorage.removeItem('jwtToken');

      //remove token from auth header
      setAuthToken(false);

      //clear the user from redux store
      dispatch(setCurrentUser({}));
    }