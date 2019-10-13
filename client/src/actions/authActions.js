import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';

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