import React, { Component } from 'react'
//import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';



class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value //[] way to bind the value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
     //axios is a way to call the api and relay the values. fetch is another way to do the same
    // axios
    //   .post('/api/users/login', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({
    //     errors: err.response.data
    //   }));
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard'); //this is the same way that when user registers and navigate to login page, this would have been written in authActions.js after axios call
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  render() {
    const {errors} = this.state;
   
    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" value={this.state.email} onChange={this.onChange} name="email" />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" value={this.state.password} onChange={this.onChange} name="password" />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser}) (Login);