import React, { Component } from 'react';
//import axios from 'axios';
import classnames from 'classnames';
import {registerUser} from '../../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);

    //axios is a way to call the api and relay the values. fetch is another way to do the same
    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({
    //     errors: err.response.data
    //   }));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }


  render() {
    //const errors = this.state.errors; same as deconstructors
    const {errors} = this.state;
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.name})} placeholder="Name" value={this.state.name} onChange={this.onChange} name="name" required />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </div>
              <div className="form-group">
                <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" value={this.state.email} onChange={this.onChange} name="email" />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" value={this.state.password} onChange={this.onChange} name="password" />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password2})} placeholder="Confirm Password" value={this.state.password2} onChange={this.onChange} name="password2" />
                {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register);
