import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { // tracks username and password locally
      username: 'username',
      password: 'password',
    }

    this.inputChange = this.inputChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
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

  loginHandler() {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(user, this.props.history);
  }

  render() {
    return (
      <div className='login-container'>
        <h1>Login Page</h1>
        <input
          type='text' name='username'
          placeholder={this.state.username}
          onChange={this.inputChange}
        />
        <input
          type='password' name='password'
          placeholder={this.state.password}
          onChange={this.inputChange}
        />
        <button className='btn' onClick={this.loginHandler}>Login</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user, history) => {
      dispatch(loginUser(user, history));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);