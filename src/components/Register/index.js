import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { // tracks username and password locally
      username: 'username',
      email: 'email',
      password: 'password',
    }

    this.inputChange = this.inputChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  inputChange(event) { // tracks login form input
    switch (event.target.name) {
      case 'username':
        this.setState({ username: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }

  registerUser() {
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log('Registration method');

    return axios.post('/api/register', data)
      .then(response => {
        console.log('User registered! ', response);
      })
      .catch(err => console.log('Registration error! ', err.response));
  }

  render() {
    return (
      <div className='register-container'>
        <h1>Register</h1>
        <input
          type='text' name='username'
          placeholder={this.state.username}
          onChange={this.inputChange}
        />
        <input
          type='text' name='email'
          placeholder={this.state.email}
          onChange={this.inputChange}
        />
        <input
          type='text' name='password'
          placeholder={this.state.password}
          onChange={this.inputChange}
        />
        <button className='btn' onClick={ this.registerUser }>Submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // console.log('mapDispatchToProps ACTIVATED');
  // return {
  //   RegisterUser: () => {
  //     dispatch(RegisterUser());
  //   }
  // }
}

export default connect(null, mapDispatchToProps)(Register);