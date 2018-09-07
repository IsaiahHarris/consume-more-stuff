import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import {Redirect} from 'react-router-dom';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.state = {
      username: '',
      password: '',
      passwordError: '',
      usernameError: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  handleInputChange(event) {
    // tracks login form input
    switch (event.target.name) {
      case 'username':
        this.setState({
          username: event.target.value,
          usernameError: !this.state.username ? '' : this.state.usernameError
        });
        break;
      case 'password':
        this.setState({
          password: event.target.value,
          passwordError: !this.state.password ? '' : this.state.passwordError
        });
        break;
      default:
        break;
    }
  }

  handleLogin() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };


    this.props.loginUser(user, this.props.history);

    this.setState({
      username: '',
      password: '',
      passwordError: '',
      usernameError: ''
    });
  }

  validateInputs(event) {
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
    const from =  this.props.location.state ? this.props.location.state.from.pathname : '/';
    const { password, username} = this.state;
    const authen = this.props.loginError.referrer ? this.props.loginError.referrer : null
    console.log('authen', authen);
    if(authen === true){
      return (
        <Redirect to={from} />
      )
    }
    
    let isEnabled = username.length > 0 && password.length > 0;

    return (
      <div className="login-container">
        {this.props.loginError.error && (
          <div className="error-message-login">Invalid Credentials</div>
        )}

        <h1>Login Page</h1>

        <input
          type="text"
          name="username"
          placeholder={this.state.username}
          onChange={this.handleInputChange}
          onBlur={this.validateInputs}
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
          onChange={this.handleInputChange}
          onBlur={this.validateInputs}
          value={this.state.password}
        />
        {!isEnabled && this.state.passwordError ? (
          <div className="error-message-login">{this.state.passwordError}</div>
        ) : (
          ''
        )}

        <button
          className="btn"
          onClick={this.handleLogin}
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
