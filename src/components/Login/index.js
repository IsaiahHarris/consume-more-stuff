import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import {Redirect} from 'react-router-dom';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordError: '',
      usernameError: '',
      redirectToReferrer: false
    };

    this.inputChange = this.inputChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.validation = this.validation.bind(this);
  }

  inputChange(event) {
    // tracks login form input
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

  loginHandler(redirect) {
    console.log('redirect', redirect);
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history, redirect);
    this.setState({
      username: '',
      password: '',
      passwordError: '',
      usernameError: '',
      redirectToReferrer: true
    });
  }

  validation(event) {
    if (event.target.name === 'username' && !this.state.username) {
      let usernameError = 'Username Is Required';
      this.setState({
        usernameError: usernameError
      });
    }

    if (event.target.name === 'password' && !this.state.password) {
      let passwordError = 'Password Is Required';
      this.setState({
        passwordError: passwordError
      });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { password, username, redirectToReferrer } = this.state;

    if(redirectToReferrer){
      return (
        <Redirect to={from} />
      )
    }

    
    let isEnabled = username.length > 0 && password.length > 0;
    return (
      <div className="login-container">
        {this.props.loginError.error && (
          <div className="error-message-login">Wrong Username Or Password</div>
        )}
        <h1>Login Page</h1>
        <input
          type="text"
          name="username"
          placeholder={this.state.username}
          onChange={this.inputChange}
          onBlur={this.validation}
          value={this.state.username}
        />
        {!isEnabled && this.state.usernameError ? (
          <div className="error-message-login">{this.state.usernameError}</div>
        ) : (
          ''
        )}
        <input
          type="password"
          name="password"
          placeholder={this.state.password}
          onChange={this.inputChange}
          onBlur={this.validation}
          value={this.state.password}
        />
        {!isEnabled && this.state.passwordError ? (
          <div className="error-message-login">{this.state.passwordError}</div>
        ) : (
          ''
        )}
        <button
          className="btn"
          onClick={() => {
             console.log('this.state.redirectToReferrer',this.state.redirectToReferrer );
            this.loginHandler(this.state.redirectToReferrer);
          }}
          disabled={!isEnabled}
        >
          Login
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user, history) => {
      dispatch(loginUser(user, history));
    }
  };
};

const mapStateToProps = state => {
  return {
    loginError: state.usersList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
