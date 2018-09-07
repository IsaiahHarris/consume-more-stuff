import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../actions';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Track username and password locally:
      username: '',
      email: '',
      password: '',
      passwordError: '',
      usernameError: '',
      emailError: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.register = this.register.bind(this);
  }

  handleInputChange(event) {
    // Track login form input:
    switch (event.target.name) {
      case 'username':
        this.setState({
          username: event.target.value,
          usernameError: !this.state.username ? '' : this.state.usernameError
        });
        break;
      case 'email':
        this.setState({
          email: event.target.value,
          emailError:
            !this.state.email.includes('@') || !this.state.email
              ? ''
              : this.state.emailError
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

  validateInputs(event) {
    if (event.target.name === 'username' && !this.state.username) {
      let usernameError = 'Username Required';
      this.setState({
        usernameError: usernameError
      });
    }

    if (
      event.target.name === 'email' &&
      (!this.state.email || !this.state.email.includes('@'))
    ) {
      let emailError = 'Valid Email Address Required';
      this.setState({ emailError: emailError });
    }

    if (event.target.name === 'password' && !this.state.password) {
      let passwordError = 'Password Required';
      this.setState({
        passwordError: passwordError
      });
    }
  }

  // Send HTTP request with registration data to backend:
  register() {
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { username, email, password } = this.state;

    let isEnabled =
      username.length > 0 &&
      email.length > 0 &&
      email.includes('@') &&
      password.length > 0;

    return (
      <div>
        <div className="register-container">
          {this.props.error.error && (
            <div className="error">
              User already exists under that email or username
            </div>
          )}

          <h1>Register</h1>

          <input
            type="text"
            name="username"
            placeholder={this.state.username}
            onChange={this.handleInputChange}
            onBlur={this.validateInputs}
            value={this.state.username}
          />
          {!isEnabled && this.state.usernameError ? (
            <div className="error">{this.state.usernameError}</div>
          ) : (
            ''
          )}

          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.handleInputChange}
            onBlur={this.validateInputs}
            value={this.state.email}
          />
          {!isEnabled && this.state.emailError ? (
            <div className="error">{this.state.emailError}</div>
          ) : (
            ''
          )}

          <input
            type="text"
            name="password"
            placeholder={this.state.password}
            onChange={this.handleInputChange}
            onBlur={this.validateInputs}
            value={this.state.password}
          />
          {!isEnabled && this.state.passwordError ? (
            <div className="error">{this.state.passwordError}</div>
          ) : (
            ''
          )}

          <button className="btn" onClick={this.register} disabled={!isEnabled}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (user, history) => {
      dispatch(registerUser(user, history));
    }
  };
};

const mapStateToProps = state => {
  return {
    error: state.usersList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
