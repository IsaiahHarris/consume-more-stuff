import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className='login-container'>
      <h1>Login Page</h1>
        <input type='text' name='username' placeholder='username' />
        <input type='text' name='password' placeholder='password' />
        <button className='btn'>Login</button>
      </div>
    );
  }
}

export default Login;