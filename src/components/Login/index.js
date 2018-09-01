import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { // tracks username and password locally
      username:'username',
      password:'password',
    }

    this.inputChange = this.inputChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  inputChange(event) { // tracks login form input
    switch (event.target.name) {
      case 'username':
        this.setState({username: event.target.value});
        break;
      case 'password':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  }

  loginUser() {
    console.log('user logged in', this.state.username);
    console.log('with password: ', this.state.password);
    const user = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.addUser(user);
  }

  render() {
    return (
      <div className='login-container'>
        <h1>Login Page</h1>
        <input 
          type='text' name='username'
          placeholder={ this.state.username }
          onChange={ this.inputChange }
        />
        <input 
          type='text' name='password'
          placeholder={ this.state.password }
          onChange={ this.inputChange }
        />
        <button className='btn' onClick={ this.loginUser }>Login</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  console.log('mapDispatchToProps ACTIVATED');
  return {
    addUser: user => {
      dispatch(addUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);